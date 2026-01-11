param location string
param name string
param container_name string
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
resource blobContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2022-09-01' = {
  name : '${storageAccount.name}/default/${container_name}'
}
