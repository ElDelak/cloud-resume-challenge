const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  GetCommand,
  UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME;
const COUNTER_ID = "page-views"; // Fixed counter ID

exports.handler = async (event) => {
  console.log("Event:", JSON.stringify(event, null, 2));

  const path = event.rawPath || event.requestContext?.http?.path;

  try {
    // Determine operation based on path
    if (path === "/counter/increment") {
      return await incrementCounter();
    } else if (path === "/counter/decrement") {
      return await decrementCounter();
    } else if (path === "/counter/reset") {
      return await resetCounter();
    } else if (path === "/counter") {
      return await getCounter();
    } else {
      return {
        statusCode: 404,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ error: "Not found" }),
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: "Internal server error",
        message: error.message,
      }),
    };
  }
};

async function getCounter() {
  const command = new GetCommand({
    TableName: TABLE_NAME,
    Key: { id: COUNTER_ID },
  });

  const response = await docClient.send(command);

  const count = response.Item?.count || 0;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ count }),
  };
}

async function incrementCounter() {
  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { id: COUNTER_ID },
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
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ count: response.Attributes.count }),
  };
}

async function decrementCounter() {
  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { id: COUNTER_ID },
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
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ count: response.Attributes.count }),
  };
}

async function resetCounter() {
  const command = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: { id: COUNTER_ID },
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
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ count: response.Attributes.count }),
  };
}
