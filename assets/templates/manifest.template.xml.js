module.exports = (props) =>
`<?xml version="1.0" encoding="UTF-8"?>
<!--Copyright 2018 Adobe. All rights reserved.This file is licensed to you under the Apache License, Version 2.0 (the "License");you may not use this file except in compliance with the License. You may obtain a copyof the License at http://www.apache.org/licenses/LICENSE-2.0Unless required by applicable law or agreed to in writing, software distributed underthe License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONSOF ANY KIND, either express or implied. See the License for the specific languagegoverning permissions and limitations under the License. -->
<ExtensionManifest xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   ExtensionBundleId="${props.extensionBundleId}"
                   ExtensionBundleVersion="${props.extensionBundleVersion}"
                   ExtensionBundleName="${props.extensionBundleName}"
                   Version="${props.cepVersion}">
  <ExtensionList>
    <Extension Id="${props.extensionBundleId}" Version="${props.extensionBundleVersion}" />
    <Extension Id="${props.extensionBundlePanelId}" Version="${props.extensionBundleVersion}" />
  <!-- <Host Name="PHXS" Port="8088"/>
      <Host Name="PHSP" Port="8088"/> -->
  </ExtensionList>
  <ExecutionEnvironment>
    <HostList>
        <Host Name="PHXS" Version="[0.0,99.9]" />
        <Host Name="PHSP" Version="[0.0,99.9]" />
        <Host Name="IDSN" Version="[0.0,99.9]" />
        <Host Name="AICY" Version="[0.0,99.9]" />
        <Host Name="ILST" Version="[0.0,99.9]" />
        <Host Name="PPRO" Version="[0.0,99.9]" />
        <Host Name="AEFT" Version="[0.0,99.9]" />
        <Host Name="PRLD" Version="[0.0,99.9]" />
        <Host Name="FLPR" Version="[0.0,99.9]" />
        <Host Name="DRWV" Version="[0.0,99.9]" />
    </HostList>
    <LocaleList>
      <Locale Code="All" />
    </LocaleList>
    <RequiredRuntimeList>
      <RequiredRuntime Name="CSXS" Version="${props.cepVersion}" />
    </RequiredRuntimeList>
  </ExecutionEnvironment>
  <DispatchInfoList>
    <Extension Id="${props.extensionBundlePanelId}">
      <DispatchInfo>
        <Resources>
          <MainPath>./index.html</MainPath>
          <!-- <ScriptPath>./host/index.jsx</ScriptPath> -->
          <CEFCommandLine>
              <Parameter>--enable-nodejs</Parameter>
              <Parameter>--mixed-context</Parameter>
          </CEFCommandLine>
        </Resources>
        <Lifecycle>
          <AutoVisible>true</AutoVisible>
        </Lifecycle>
        <UI>
          <Type>Panel</Type>
          <Menu>${props.panelName}</Menu>
          <Geometry>
            <Size>
              <Width>${props.width}</Width>
              <Height>${props.height}</Height>
            </Size>
            <!-- <MinSize>
              <Width>${props.width}</Width>
              <Height>${props.height}</Height>
            </MinSize> -->
            <MaxSize>
              <Width>${props.width}</Width>
              <Height>${props.height}</Height>
            </MaxSize>
          </Geometry>
          <Icons>
              <Icon Type="Normal">./icons/favicon.ico</Icon>
              <Icon Type="RollOver">./icons/favicon.ico</Icon>
              <Icon Type="DarkNormal">./icons/favicon.ico</Icon>
              <Icon Type="DarkRollOver">./icons/favicon.ico</Icon>
          </Icons>
        </UI>
      </DispatchInfo>
    </Extension>

    <Extension Id="${props.extensionBundleId}">
    <DispatchInfo>
      <Resources>
        <MainPath>./rpc.html</MainPath>
        <ScriptPath>./host/index.jsx</ScriptPath>
      <CEFCommandLine>
        <Parameter>--allow-file-access</Parameter>
        <Parameter>--allow-file-access-from-files</Parameter>
        <Parameter>--enable-nodejs</Parameter>
        <Parameter>--mixed-context</Parameter>
      </CEFCommandLine>
      </Resources>
      <Lifecycle>
        <AutoVisible>false</AutoVisible>
        <StartOn>
          <Event>com.adobe.csxs.events.ApplicationInitialized</Event>
          <!-- <Event>com.adobe.csxs.events.AppOnline</Event> -->
          <Event>applicationActivate</Event>
          <Event>com.adobe.csxs.events.ApplicationActivate</Event>
        </StartOn>
      </Lifecycle>
      <UI>
        <Type>Custom</Type>
        <Geometry>
          <Size>
            <Height>500</Height>
            <Width>500</Width>
          </Size>
        </Geometry>
      </UI>
    </DispatchInfo>
  </Extension>
  </DispatchInfoList>
</ExtensionManifest>`
