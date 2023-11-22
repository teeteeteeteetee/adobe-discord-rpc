const hosts = require("../../src/rpc_client-src/client.js")

const getHosts = (props) => {
  const data = []
  for (var key in hosts) {
    data.push(getHost(props, key))
  }
  return [...data]
}

const getHost = (props, key) =>
`  
<Extension Id="${props.extensionBundleId}.${hosts[key].name.replace(" ", "-").toLowerCase()}">
  <HostList>
    <Host Name="PHXS" Port="4001" />
    <Host Name="PHSP" Port="4002" />
    <Host Name="IDSN" Port="4003" />
    <Host Name="AICY" Port="4004" />
    <Host Name="ILST" Port="4005" />
    <Host Name="PPRO" Port="4006" />
    <Host Name="AEFT" Port="4007" />
    <Host Name="PRLD" Port="4008" />
    <Host Name="FLPR" Port="4009" />
    <Host Name="DRWV" Port="4010" />
    <Host Name="AUDT" Port="4011" />
  </HostList>
</Extension>
` 

module.exports = (props) =>
`<?xml version="1.0" encoding="UTF-8"?>
<ExtensionList>
  <Extension Id="${props.extensionBundlePanelId}">
    <HostList>
      <Host Name="PHXS" Port="3001" />
      <Host Name="PHSP" Port="3002" />
      <Host Name="IDSN" Port="3003" />
      <Host Name="AICY" Port="3004" />
      <Host Name="ILST" Port="3005" />
      <Host Name="PPRO" Port="3006" />
      <Host Name="AEFT" Port="3007" />
      <Host Name="PRLD" Port="3008" />
      <Host Name="FLPR" Port="3009" />
      <Host Name="DRWV" Port="3010" />
      <Host Name="AUDT" Port="3011" />
    </HostList>
  </Extension>
  ${getHosts(props).join('')}
</ExtensionList>`
