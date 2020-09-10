var RPC = require("discord-rpc");
var rpc = new RPC.Client({
    transport: "ipc"
});

var currentTime = new Date()

module.exports = discord

function discord (appID, state, details, smallImageKey, smallImageText, largeImageText, partySize, partyMax) {
    console.log("RPC")
    
    const apps = require("./adobe.json")

    function setActivity(){
        rpc.setActivity({
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

rpc.on("ready", () => {
    console.log("ready")
    setActivity();
    })
}

