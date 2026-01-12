param location string
param name string

resource storageAccount 'Microsoft.Storage/storageAccounts@2022-09-01' = {
  location: location
  name: name
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Cool'
  }
}

output storageAccountName string = storageAccount.name
