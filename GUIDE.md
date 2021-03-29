# Adobe Discord Rich Presence
![](https://github.com/lolitee/adobe-discord-rpc/raw/master/demo/demo.gif "Preview of Discord x Adobe Rich Presence.")
# Information

**The CEP Server runs on default port __6767__ so make sure nothing runs on that port, otherwise the API server wont start and will error out.**

This extension works on **CEP 8,9 and 10**

# How to
![](https://github.com/lolitee/adobe-discord-rpc/raw/master/demo/installation1.gif "Quick Demo of the Extension being installed")
## Method 1
 _([If you don't have a zip extractor you can install one **here**](https://7-zip.org))_
1. Unzip the file using your preferred .zip extractor and extract the folder `discord rpc` into
	- `C:/Program Files (x86)/Common Files/Adobe/CEP/extensions`
		- Hold `Windows + R` and enter **%appdata%**
	- `%appdata%/Adobe/CEP/extensions` _(User only)_
2. Make sure you have debug mode enabled in __both__ folders. Debug mode has more information [here](https://github.com/Adobe-CEP/Getting-Started-guides/tree/master/Client-side%20Debugging) *(The reason to do this is because I didn't sign the extension)*
	- (If there's multiple CSX numbers in Registry Editor then create one for them for all)
3. Open any Adobe app that supports this extension.
4. On the top of the window, go to `Window > Extensions > Discord Rich Presence`

And there you go! You should see the Rich Presence on your profile, if it doesn't, go to [Troubleshooting](#Troubleshooting "Scrolls you down to the troubleshooting section"), and if that still doesn't work, Go to [Support](#Support "Scrolls you down to the Support Section").

## Method 2
1. Install any app that supports `.zxp` files
	 - Or you can use Adobe's Extension Manager
2. Import the `.zxp` file.

# Troubleshooting
- If there is no `/CEP/` folder then you might have a bad Adobe Installation.
- If the extension doesn't show up in `Window > Extensions`, then re-check if `PlayerDebugMode` is set to `1` in Registry Editor
- Make sure there is nothing apart from the extension running on __Port 6767__. _(Will be fixed in the future)_ 
- If you have done everything above correctly, Check if the extension has created a folder in `%appdata%` "adobe-discord-rpc". If not, there may be some permission issues and can be fixed by downloading [this file](https://cdn.discordapp.com/attachments/819529494015639593/819529506884026418/adobe-discord-rpc.zip "Download to the \"adobe-discord-rpc\" file to add to %appdata%")
- If **nothing above** works, then there's most likely an issue on Adobe's side, most likely that your app is outdated or the extension itself is broken. I recommend updating your app.

# Support
If __NOTHING__ on the troubleshooting section works. Or you need extra assistance to install the extension, feel free to join the help server [here.](https://discord.gg/RGtxbuFtzb "Redirects you to the Adobe Discord Rich Presence Support Server.")

### Support Server
**[discord.gg/RGtxbuFtzb](https://discord.gg/RGtxbuFtzb "Join for Support")**
