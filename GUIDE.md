# Adobe Discord Rich Presence
![](https://github.com/lolitee/adobe-discord-rpc/raw/master/demo/demo.gif "Preview of Discord x Adobe Rich Presence.")

# special thanks to Stxyl for helping me test macOS compatibility!

# Information

This extension works on **CEP 8+ (2018+)**

# How to
![](https://github.com/lolitee/adobe-discord-rpc/raw/master/demo/installation1.gif "Quick Demo of the Extension being installed")
## Method 1

[video guide](https://www.youtube.com/watch?v=uZUnG9jf9RI)
[earlier versions](https://youtu.be/oHytdpcVlJ8)
- you can ignore the %appdata%/adobe step

 _([If you don't have a zip extractor you can install one **here**](https://7-zip.org))_
1. Unzip the file using your preferred .zip extractor and extract the folder `discord rpc` into:
	- **Windows:**
		- `C:/Program Files (x86)/Common Files/Adobe/CEP/extensions`
		OR
			- Hold `Windows + R` and enter **%appdata%**
		- `%appdata%/Adobe/CEP/extensions` _(User only)_ \n (only if program files folder didn't work)
	- **MacOS:**
		- `~/Library/Application Support/Adobe/CEP/extensions`
<!-- 		- chmod the folder in terminal with `chmod -R 777 'discord rpc'` (recommended) -->
2. - **Windows:**: 
	In regedit, go to one of these paths depending on your version
 		- 2021(late): `HKEY_CURRENT_USER\Software\Adobe\CSXS.11`
		- 2021(early)/2020(late): `HKEY_CURRENT_USER\Software\Adobe\CSXS.10`
		- 2020(early)/2019: `HKEY_CURRENT_USER\Software\Adobe\CSXS.9`
		- (If there's multiple CSX numbers in Registry Editor then create one for them for all)
	- Create a string value called "PlayerDebugMode" and put "1" as value
   - **MacOS:**: 
   	In the terminal write
   		- 2021(late): `defaults write com.adobe.CSXS.11 PlayerDebugMode 1`
   		- 2021(early)/2020(late): `defaults write com.adobe.CSXS.10 PlayerDebugMode 1`
		- 2020(early)/2019: `defaults write com.adobe.CSXS.9 PlayerDebugMode 1`
		- I recommend writing all of them in terminal
	~~- Application should be added into accessibility under the system preference [ref](https://cdn.discordapp.com/attachments/861647140937400380/861740220869640233/unknown.png)~~

3. Open any Adobe app that supports this extension.
4. On the top of the window, go to `Window > Extensions > Discord Rich Presence`

And there you go! You should see the Rich Presence on your profile, if it doesn't, go to [Troubleshooting](#Troubleshooting "Scrolls you down to the troubleshooting section"), and if that still doesn't work, Go to [Support](#Support "Scrolls you down to the Support Section").

## Method 2
1. Install any app that supports `.zxp` files
	 - Or you can use Adobe's Extension Manager
2. Import the `.zxp` file.

# Troubleshooting
- **Windows:**
	- If there is no `/CEP/` folder then you might have a bad Adobe Installation.
	- If the extension doesn't show up in `Window > Extensions`, then re-check if `PlayerDebugMode` is set to `1` in Registry Editor
	- If **nothing above** works, then there's most likely an issue on Adobe's side, most likely that your app is outdated or the extension itself is broken. I 		recommend updating your app.
# Support
If __NOTHING__ on the troubleshooting section works. Or you need extra assistance to install the extension, feel free to join the help server [here.](https://discord.gg/RGtxbuFtzb "Redirects you to the Adobe Discord Rich Presence Support Server.")

### Support Server
**[discord.gg/RGtxbuFtzb](https://discord.gg/RGtxbuFtzb "Join for Support")**
