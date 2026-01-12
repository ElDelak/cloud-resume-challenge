param dns_zone_name string
param frontdoor_endpoint_id string

resource dnsZone 'Microsoft.Network/dnsZones@2018-05-01' existing = {
  name: dns_zone_name
}

// ALIAS record for root domain (@) pointing to Front Door endpoint
resource aliasRecord 'Microsoft.Network/dnsZones/A@2018-05-01' = {
  name: '@'
  parent: dnsZone
  properties: {
    TTL: 3600
    targetResource: {
      id: frontdoor_endpoint_id
    }
  }
}

output aliasRecordName string = aliasRecord.name
output aliasRecordFqdn string = aliasRecord.properties.fqdn
