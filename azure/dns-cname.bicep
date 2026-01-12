param dns_zone_name string
param cname_target string

resource dnsZone 'Microsoft.Network/dnsZones@2018-05-01' existing = {
  name: dns_zone_name
}

// CNAME record for www subdomain pointing to Front Door endpoint
resource cnameRecord 'Microsoft.Network/dnsZones/CNAME@2018-05-01' = {
  name: 'www'
  parent: dnsZone
  properties: {
    TTL: 3600
    CNAMERecord: {
      cname: cname_target
    }
  }
}

output cnameRecordName string = cnameRecord.name
output cnameRecordFqdn string = cnameRecord.properties.fqdn
