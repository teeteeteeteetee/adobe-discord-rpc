const RPC = require('discord-rpc')

var monitor = require('active-window');
var activeApp = require('./activeApp');

var apps = require("./adobe.json");

//var main = require("./main")

var global = {}

var _activeApp;
var _previousApp;
var data;

var smallImageKeyOld
var smallImageTextOld
var largeImageTextOld
var detailsOld
var stateOld
var partySizeOld
var partyMaxOld

module.exports.user = user

function user(){
    
        var data = {
            "username": global[_activeApp].user.username,
            "discriminator": global[_activeApp].user.discriminator,
            "id": global[_activeApp].user.id,
            "avatarURL": `https://cdn.discordapp.com/avatars/${global[_activeApp].user.id}/${global[_activeApp].user.avatar}?size=256`
        }
    return data
}

module.exports.run = discord

function discord(_data){
    data = JSON.parse(_data)
}

function callback(window){
    try {

        if(!activeApp.run(window.app)) return;
    
        // if(!settings[activeApp.run(window.app)].enabled) {

        //     console.log("loololol killed")

        //     try{
        //         global[activeApp.run(window.app)].destroy()
        //     }catch(err){

        //     }

        //     console.log(!global[activeApp.run(window.app)])

        //     if(!global[activeApp.run(window.app)] && main.host){
        //         console.log("loololol killed 2x")
      
        //         setTimeout(() => {
        //             main.killServer();
        //         }, 15000);
        //     }

        //     return;
        // }

        _activeApp = activeApp.run(window.app);

        if(_activeApp != _previousApp){
            if(global[activeApp.run(window.app)]) global[activeApp.run(window.app)].destroy()
            global[activeApp.run(window.app)] = new RPC.Client({
                transport: "ipc"
            })
        }

try{
    if(smallImageKeyOld != data[_activeApp].smallImageKey || 
        smallImageTextOld != data[_activeApp].smallImageText || 
        largeImageTextOld != data[_activeApp].largeImageText ||
        detailsOld != data[_activeApp].details ||
        stateOld != data[_activeApp].state ||
        partySizeOld != data[_activeApp].partySize ||
        partyMaxOld != data[_activeApp].partyMax) run();
}catch(err){
    console.log("cant get data")
    return
}

        module.exports.forceRun = run;

        function run(){

        var settings = require(process.env.APPDATA + "\\adobe-discord-rpc\\config.json")

        var rpc = global[_activeApp];

        //Error: child "activity" fails because [child "small_image" fails because ["small_image" is not allowed to be empty]]]
        for (var item in data[_activeApp]) {
            if(data[_activeApp][item] === "") data[_activeApp][item] = undefined;
        }
        console.log(data[_activeApp])

        var details_;
        var state_;
        var timestamp_;

        smallImageKeyOld = data[_activeApp].smallImageKey
        smallImageTextOld = data[_activeApp].smallImageText
        largeImageTextOld = data[_activeApp].largeImageText
        detailsOld = data[_activeApp].details
        stateOld = data[_activeApp].state,
        partySizeOld = data[_activeApp].partySize
        partyMaxOld = data[_activeApp].partyMax

        console.log(rpc.user)

        if(!settings[_activeApp].details){
            details_ = undefined
        }else{
            details_ = data[_activeApp].details
        }
        if(!settings[_activeApp].state) {
            state_ = undefined
        }else{
            state_ = data[_activeApp].state
        }
        if(!settings[_activeApp].timestamp) {
            timestamp_ = undefined
        }else{
            timestamp_ = data[_activeApp].timestamp
        }

        // details: data[_activeApp].details,
        // state: data[_activeApp].state,
        // startTimestamp: data[_activeApp].timestamp,

        rpc.on("ready", () => {
            rpc.setActivity({
                largeImageKey: "logo",
                smallImageKey: data[_activeApp].smallImageKey,
                smallImageText: data[_activeApp].smallImageText,
                largeImageText: data[_activeApp].largeImageText,
                details: details_,
                state: state_,
                startTimestamp: timestamp_,
                partySize: parseInt(data[_activeApp].partySize),
                partyMax: parseInt(data[_activeApp].partyMax)
            })
        })
        if(_previousApp){
            if(_previousApp != _activeApp) {
                global[_previousApp].destroy()
                delete global[_previousApp];
            };
        }

        rpc.login({
            clientId: apps[_activeApp].clientID
        }).then(() => {
            _previousApp = _activeApp
        })
    }

    }catch(err) {
        console.log(err)
    } 
  }

monitor.getActiveWindow(callback, -1, 3);


