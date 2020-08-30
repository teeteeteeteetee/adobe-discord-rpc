var RPC = require("discord-rpc");
var rpc = new RPC.Client({
    transport: "ipc"
});

var currentTime = new Date()

module.exports = discord

function discord (appID, state, details, smallImageKey, smallImageText, largeImageText) {
    console.log("RPC")
    
    const apps = require("./adobe.json")
    
    // var app;
    // var exec = require('child_process').exec;
    
    // exec('tasklist', function(err, stdout, stderr) {
    
    //     var output = stdout.toLowerCase()
    
    // for (let index = 0; index < apps.adobe.length; index++) {
    //     const element = apps.adobe[index]
    
    //     var check = output.includes(element.processExe)
    //     if(check == true){
    //         app = element.processExe
    //         console.log(app)
    //     }
    // }
    
    // });

    function setActivity(){
        rpc.setActivity({
            largeImageKey: "logo",
            smallImageKey: smallImageKey,
            smallImageText: smallImageText,
            largeImageText: largeImageText,
            details: details,
            state: state,
            startTimestamp: currentTime
        })
    }
    
   
rpc.login({
    clientId: "748568089939148832"
})

rpc.on("ready", () => {
    console.log("ready")
    setActivity();
    })
}

