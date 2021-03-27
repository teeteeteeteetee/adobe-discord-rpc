**CEP server on default uses port 6767 so make sure nothing runs on that port, otherwise the API server wont start and will error out!**

Works on CEP 8,9,10

![](demo/installation1.gif)

Method 1

- Download the extension from https://github.com/lolitee/adobe-discord-rpc/releases (DO not clone the repo)
- Unzip the zip file which contains "adobe rpc" into 
  - C:/Program Files (x86)/Common Files/Adobe/CEP/extensions 
  - %appdata%/Adobe/CEP/extensions (user only)
- Make sure you have turned on debug mode more information in: https://github.com/Adobe-CEP/Getting-Started-guides/tree/master/Client-side%20Debugging (the reason is because I didn't sign the extension) (if theres for example csx 9/10 in regedit then create the PlayerDebugMode for them too)
- Open any adobe app that is being supported by this extension
- On top of the window "Window -> Extensions -> Discord Rich Presence"

Method 2

- Install any apps that supports installing .zxp files, or use adobe's extension manager
- import the .zxp file

Troubleshooting:

- If there's no CEP folder then you might have a bad Adobe installation.
- If the extension doesn't appear in (Window/Extensions) then re-check if you have added "PlayerDebugMode -> 1" in regedit
- Make sure nothing runs on port 6767 (will be changed in future)
- If you have done everything correctly, please check if the extension has generated in %appdata% "adobe-discord-rpc" folder, if not then there might be some permission issues and it can be fixed by adding [https://cdn.discordapp.com/attachments/819529494015639593/819529506884026418/adobe-discord-rpc.zip](this) folder in %appdata%
- If it still doesn't work then there's an issue on Adobe's side most likely due to an outdated version that has broken extensions, I recommend updating your Adobe app

Feel free to join my help discord server if you don't know how to install the extension [https://discord.gg/RGtxbuFtzb ](here)
