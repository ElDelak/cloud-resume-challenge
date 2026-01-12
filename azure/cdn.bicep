param location string
param name string
param domain_fqdn string  // www.mabrouk-engineering.com
param dns_zone_name string
param dns_zone_rg string
param storageEndpoint string
param apex_fqdn string  // mabrouk-engineering.com

// Extract the static website host from the endpoint URL
var staticHost = replace(replace(storageEndpoint, 'https://', ''), '/', '')

resource fd 'Microsoft.Cdn/profiles@2023-05-01' = {
  name: 'fd-${uniqueString(resourceGroup().id)}'
  location: 'global'
  sku: { name: 'Standard_AzureFrontDoor' }
}

resource fdEndpoint 'Microsoft.Cdn/profiles/afdEndpoints@2023-05-01' = {
  name: 'ep-${uniqueString(resourceGroup().id)}'
  parent: fd
  location: 'global'
  properties: { enabledState: 'Enabled' }
}

// Origin group + origin pointing at Storage Static Website
resource og 'Microsoft.Cdn/profiles/originGroups@2023-05-01' = {
  name: 'og-default'
  parent: fd
  properties: {
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
  }
}

resource origin 'Microsoft.Cdn/profiles/originGroups/origins@2023-05-01' = {
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

// Deploy CNAME for www subdomain
module cnameRecord 'dns-cname.bicep' = {
  name: 'deploy-cname-record'
  scope: resourceGroup(dns_zone_rg)
  params: {
    dns_zone_name: dns_zone_name
    cname_target: fdEndpoint.properties.hostName
  }
}

// Deploy ALIAS for apex domain
module aliasRecord 'dns-alias.bicep' = {
  name: 'deploy-alias-record'
  scope: resourceGroup(dns_zone_rg)
  params: {
    dns_zone_name: dns_zone_name
    frontdoor_endpoint_id: fdEndpoint.id
  }
}

// Custom domain for www
resource customDomain 'Microsoft.Cdn/profiles/customDomains@2023-05-01' = {
  name: 'cd-www-${uniqueString(domain_fqdn)}'
  parent: fd
  properties: {
    hostName: domain_fqdn  // www.mabrouk-engineering.com
    azureDnsZone: { id: dnsZone.id }
    tlsSettings: {
      certificateType: 'ManagedCertificate'  
      minimumTlsVersion: 'TLS12'
    }
  }
  dependsOn: [
    cnameRecord
  ]
}

// Custom domain for apex
resource apexDomain 'Microsoft.Cdn/profiles/customDomains@2023-05-01' = {
  name: 'cd-apex-${uniqueString(apex_fqdn)}'
  parent: fd
  properties: {
    hostName: apex_fqdn  // mabrouk-engineering.com
    azureDnsZone: { id: dnsZone.id }
    tlsSettings: {
      certificateType: 'ManagedCertificate'  
      minimumTlsVersion: 'TLS12'
    }
  }
  dependsOn: [
    aliasRecord
  ]
}

// Rule set for apex -> www redirect
resource rsApex 'Microsoft.Cdn/profiles/ruleSets@2023-05-01' = {
  name: 'rsApexRedirect'
  parent: fd
}

// Rule to redirect apex to www
resource rsApexRule 'Microsoft.Cdn/profiles/ruleSets/rules@2023-05-01' = {
  name: 'redirectToWww'
  parent: rsApex
  properties: {
    order: 1
    conditions: [
      {
        name: 'UrlPath'
        parameters: {
          operator: 'Any'
          typeName: 'DeliveryRuleUrlPathMatchConditionParameters'
        }
      }
    ]
    actions: [
      {
        name: 'UrlRedirect'
        parameters: {
          redirectType: 'Moved'  // 301 permanent redirect
          destinationProtocol: 'Https'
          customHostname: domain_fqdn  // www.mabrouk-engineering.com
          typeName: 'DeliveryRuleUrlRedirectActionParameters'
        }
      }
    ]
  }
}

// Route for www (main route)
resource routeWww 'Microsoft.Cdn/profiles/afdEndpoints/routes@2023-05-01' = {
  name: 'route-www'
  parent: fdEndpoint
  properties: {
    originGroup: { id: og.id }
    supportedProtocols: [ 'Http', 'Https' ]
    httpsRedirect: 'Enabled'
    linkToDefaultDomain: 'Disabled'
    customDomains: [ { id: customDomain.id } ]
    patternsToMatch: [ '/*' ]
    forwardingProtocol: 'MatchRequest'
    enabledState: 'Enabled'
  }
  dependsOn: [
    origin
    customDomain
  ]
}

// Route for apex (redirect to www)
resource routeApex 'Microsoft.Cdn/profiles/afdEndpoints/routes@2023-05-01' = {
  name: 'route-apex'
  parent: fdEndpoint
  properties: {
    originGroup: { id: og.id }
    supportedProtocols: [ 'Http', 'Https' ]
    httpsRedirect: 'Enabled'
    linkToDefaultDomain: 'Disabled'
    customDomains: [ { id: apexDomain.id } ]
    patternsToMatch: [ '/*' ]
    ruleSets: [ { id: rsApex.id } ]
    forwardingProtocol: 'MatchRequest'
    enabledState: 'Enabled'
  }
  dependsOn: [
    origin
    apexDomain
    rsApexRule
  ]
}

output afdEndpointHost string = fdEndpoint.properties.hostName
output wwwDomainHost string = customDomain.properties.hostName
output apexDomainHost string = apexDomain.properties.hostName
output storageOriginHost string = staticHost
