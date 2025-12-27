const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME;

exports.handler = async (event) => {
  console.log("Event:", JSON.stringify(event, null, 2));

  const counterId = event.pathParameters?.id;
  const path = event.rawPath || event.requestContext?.http?.path;

  if (!counterId) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Counter ID is required" }),
    };
  }

  try {
    // Determine operation based on path
    if (path.endsWith("/increment")) {
      return await incrementCounter(counterId);
    } else if (path.endsWith("/decrement")) {
      return await decrementCounter(counterId);
    } else if (path.endsWith("/reset")) {
      return await resetCounter(counterId);
    } else {
      return await getCounter(counterId);
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Internal server error",
        message: error.message,
      }),
    };
  }
};

async function getCounter(id) {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: { id },
  });

  const response = await docClient.send(command);

  if (!response.Item) {
    return {
      statusCode: 404,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Counter not found" }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(response.Item),
  };
}

async function incrementCounter(id) {
  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: "SET #count = if_not_exists(#count, :start) + :increment",
    ExpressionAttributeNames: {
      "#count": "count",
    },
    ExpressionAttributeValues: {
      ":start": 0,
      ":increment": 1,
    },
    ReturnValues: "ALL_NEW",
  });

  const response = await docClient.send(command);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(response.Attributes),
  };
}

async function decrementCounter(id) {
  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: "SET #count = if_not_exists(#count, :start) - :decrement",
    ExpressionAttributeNames: {
      "#count": "count",
    },
    ExpressionAttributeValues: {
      ":start": 0,
      ":decrement": 1,
    },
    ReturnValues: "ALL_NEW",
  });

  const response = await docClient.send(command);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(response.Attributes),
  };
}

async function resetCounter(id) {
  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: "SET #count = :zero",
    ExpressionAttributeNames: {
      "#count": "count",
    },
    ExpressionAttributeValues: {
      ":zero": 0,
    },
    ReturnValues: "ALL_NEW",
  });

  const response = await docClient.send(command);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(response.Attributes),
  };
}
