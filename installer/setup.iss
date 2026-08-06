[setup]
AppName=Adobe Discord RPC
AppVersion=1.0.0
DisableDirPage=yes
DefaultDirName={commoncf}\Adobe\CEP\extensions
SetupIconFile=..\assets\icons\iconInstaller.ico
WizardStyle=modern
WizardImageFile=..\assets\icons\bannerInstaller.bmp
PrivilegesRequired=admin
AppPublisher=SpeedxzpDev
LicenseFile=..\LICENSE
OutputDir=output
OutputBaseFilename=installer
Compression=lzma2
SolidCompression=yes

[Files]
Source: "..\dist\com.tee.discord-rpc\*"; DestDir: "{app}\Adobe-Discord-RPC"; Flags: recursesubdirs createallsubdirs

[Icons]
Name: "{group}\Desinstalar Adobe Discord RPC"; Filename: "{uninstallexe}"
