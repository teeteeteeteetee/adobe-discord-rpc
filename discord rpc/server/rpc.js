var RPC = require("discord-rpc");
var rpc = new RPC.Client({
    transport: "ipc"
});

var currentTime = new Date()

var apps = require("./adobe.json")

module.exports = discord

function discord (appID, state, details, smallImageKey, smallImageText, largeImageText, partySize, partyMax) {

    async function setActivity(){
        await rpc.setActivity({
            largeImageKey: "logo",
            smallImageKey: smallImageKey,
            smallImageText: smallImageText,
            largeImageText: largeImageText,
            details: details,
            state: state,
            startTimestamp: currentTime,
            partySize: parseInt(partySize),
            partyMax: parseInt(partyMax)
        })
    }
   
rpc.login({
    clientId: apps[appID].clientID
})

rpc.once("ready", () => {
    setActivity();
    })
}
