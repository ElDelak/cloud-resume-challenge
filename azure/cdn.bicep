param location string
param name string
param domain_fqdn string
param dns_zone_name string
param dns_zone_rg string

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

resource staticWebsite 'Microsoft.Storage/storageAccounts/staticWebsite@2021-09-01' = {
  name: 'default'
  parent: storageAccount
  properties: {
    indexDocument: 'index.html'
    errorDocument404Path: 'index.html'
  }
}


// Static website origin host (e.g., mystorage.z13.web.core.windows.net)
var staticHost = replace(replace(storageAccount.properties.primaryEndpoints.web, 'https://', ''), '/', '')

resource fd 'Microsoft.Cdn/profiles@2025-06-01' = {
  name: 'fd-${uniqueString(resourceGroup().id)}'
  location: 'global'
  sku: { name: 'Standard_AzureFrontDoor' }
}

resource fdEndpoint 'Microsoft.Cdn/profiles/afdEndpoints@2025-06-01' = {
  name: 'ep-${uniqueString(resourceGroup().id)}'
  parent: fd
  location: 'global'
  properties: { enabledState: 'Enabled' }
}

// Origin group + origin pointing at Storage Static Website
resource og 'Microsoft.Cdn/profiles/originGroups@2025-06-01' = {
  name: 'og-default'
  parent: fd
  properties: {
    // REQUIRED now
    loadBalancingSettings: {
      sampleSize: 4
      successfulSamplesRequired: 3
      additionalLatencyInMilliseconds: 0
    }
    healthProbeSettings: {
      probePath: '/index.html'
      probeRequestType: 'GET'
      probeProtocol: 'Http'
      probeIntervalInSeconds: 120
    }
    sessionAffinityState: 'Disabled'
    // trafficRestorationTimeToHealedOrNewEndpointsInMinutes: 0   // optional (0–50), currently not supported
  }
}

resource origin 'Microsoft.Cdn/profiles/originGroups/origins@2025-06-01' = {
  name: 'origin-staticweb'
  parent: og
  properties: {
    hostName: staticHost
    httpPort: 80
    httpsPort: 443
    originHostHeader: staticHost
    priority: 1
    weight: 1000
  }
}

resource dnsZone 'Microsoft.Network/dnsZones@2018-05-01' existing = {
  name: dns_zone_name
  scope: resourceGroup(dns_zone_rg)
}

resource customDomain 'Microsoft.Cdn/profiles/customDomains@2025-06-01' = {
  name: 'cd-${uniqueString(domain_fqdn)}'
  parent: fd
  properties: {
    hostName: domain_fqdn
    azureDnsZone: { id: dnsZone.id }
    tlsSettings: {
      certificateType: 'ManagedCertificate'  
      minimumTlsVersion: 'TLS12'
    }
  }
}

// Route: bind endpoint + origin group + custom domain, force HTTPS
resource route 'Microsoft.Cdn/profiles/routes@2025-06-01' = {
  name: 'route-static'
  parent: fd
  properties: {
    endpoint: { id: fdEndpoint.id }
    originGroup: { id: og.id }
    supportedProtocols: [ 'Http', 'Https' ]
    httpsRedirect: 'Enabled'
    linkToDefaultDomain: 'Disabled'      // don’t serve *.azurefd.net
    customDomains: [ { id: customDomain.id } ]
    patternsToMatch: [ '/*' ]
    forwardingProtocol: 'MatchRequest'
    enabledState: 'Enabled'
  }
}

output storageStaticSiteUrl string = storageAccount.properties.primaryEndpoints.web
output afdEndpointHost string      = fdEndpoint.properties.hostName
output customDomainHost string     = customDomain.properties.hostName
