const RPC = require('discord-rpc');

const client = new RPC.Client({ transport: 'ipc' });
const date = new Date();

console.log(__dirname)

var apps = require(__dirname+'/apps.json');

var data;

var csInterface = new CSInterface();
var appID = csInterface.getApplicationID()
var valueChanged = false;
var user_event = new CSEvent("com.discordrpc.user", "APPLICATION");
var data_event = new CSEvent("com.discordrpc.data", "APPLICATION");
var settings_event = new CSEvent("com.discordrpc.settings.get", "APPLICATION");

var state_enable = true;
var details_enable = true;
var smallImage_enable = true;
var timestamp_enable = true;
var enabled_enable = true;


function loadJSX(fileName) {
    var csInterface = new CSInterface();
    var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/host/";
    csInterface.evalScript('$.evalFile("' + extensionRoot + fileName + '")');
    console.log(fileName);
    console.log(extensionRoot);
}


function isDynamicLink() {
    if (appID === "AEFT") {
        csInterface.evalScript("app.activeViewer", x => {
            if (x === "null") client.destroy();
        });
    }
}

client.on('ready', () => {
    isDynamicLink();
    send();
})

client.login({
    clientId: apps[appID]
}).catch(console.error);

loadJSX(appID + ".jsx");
getData();

csInterface.addEventListener('com.discordrpc.restart', function(){
    client.destroy();
    window.location.reload();
});

csInterface.addEventListener('com.discordrpc.settings', function(e){
    var data = e.data;

    localStorage.setItem("settings", JSON.stringify(data));
    console.log(localStorage.getItem("settings").toString());

    state_enable = data.state;
    details_enable = data.details;
    timestamp_enable = data.timestamp
    enabled_enable = data.enabled;

    send();

});

// if doesn't exist on first run
if (!localStorage.getItem("settings")) {

    var data = {
        state: true,
        details: true,
        timestamp: true,
        enabled: true
    };

    localStorage.setItem("settings", JSON.stringify(data));
}

var settings_json = localStorage.getItem("settings");
var parsed = JSON.parse(settings_json);

state_enable = parsed.state;
details_enable = parsed.details;
timestamp_enable = parsed.timestamp;
enabled_enable = parsed.enabled;

settings_event.data = JSON.parse(settings_json);

csInterface.addEventListener('com.discordrpc.settings.request', function() {

    var data = {
        state: state_enable,
        details: details_enable,
        timestamp: timestamp_enable,
        enabled: enabled_enable
    }

    csInterface.dispatchEvent(settings_event, data);
});

setInterval(() => {
    user_event.data = client.user;
    csInterface.dispatchEvent(user_event);

    data_event.data = data;
    csInterface.dispatchEvent(data_event);

}, 3000);

rpc = {

    data: [],

    aListener: function(val, old){},

    set state(val) {
        this.aListener(val, this.data[0]);
        this.data[0] = val;
    },
    get state() {
        return this.data[0];
    },
    set details(val) {
        this.aListener(val, this.data[1]);
        this.data[1] = val;
    },
    get details() {
        return this.data[1];
    },
    set smallImageKey(val) {
        this.aListener(val, this.data[2]);
        this.data[2] = val;
    },
    get smallImageKey() {
        return this.data[2];
    },
    set smallImageText(val) {
        this.aListener(val, this.data[3]);
        this.data[3] = val;
    },
    get smallImageText() {
        return this.data[3];
    },
    set largeImageText(val) {
        this.aListener(val, this.data[4]);
        this.data[4] = val;
    },
    get largeImageText() {
        return this.data[4];
    },
    set partySize(val) {
        val = parseInt(val);
        if(!val) val = 0;
        this.aListener(val, this.data[5]);
        this.data[5] = val;
    },
    get partySize() {
        return this.data[5];
    },
    set partyMax(val) {
        val = parseInt(val);
        if(!val) val = 0;
        this.aListener(val, this.data[6]);
        this.data[6] = val;
    },
    get partyMax() {
        return this.data[6];
    },
    registerListener: function(listener){
        this.aListener = listener;
    }
    
}

rpc.registerListener(function(val, old) {

    if(val != old) {   
        console.log(`Value changed to: ${val}`)
        valueChanged = true;
    }
  });


function getData() {

    setInterval(() => {

        csInterface.evalScript('state()', x => rpc.state = x);
        csInterface.evalScript('details()', x => rpc.details = x);
        csInterface.evalScript('smallImageKey()', x => rpc.smallImageKey = x);
        csInterface.evalScript('smallImageText()', x => rpc.smallImageText = x);
        csInterface.evalScript('largeImageText()', x => rpc.largeImageText = x);
        csInterface.evalScript('partySize()', x => rpc.partySize = x);
        csInterface.evalScript('partyMax()', x => rpc.partyMax = x);

        if(valueChanged){
            valueChanged = false;
            send();
        }
        
    }, 1000);

}

function send(){

    data = {
        "appID": appID,
        "state": state_enable == true ? (rpc.state.length <= 2 ? `[${rpc.state}]` : rpc.state) : undefined,
        "details": details_enable == true ? rpc.details : undefined,
        "smallImageKey": smallImage_enable == true ? rpc.smallImageKey : undefined,
        "largeImageKey": "logo",
        "smallImageText": details_enable == true ? rpc.smallImageText : undefined,
        "largeImageText": rpc.largeImageText,
        "partySize": rpc.partySize == 0 ? null: rpc.partySize,
        "partyMax": rpc.partyMax == 0 ? null : rpc.partyMax,
        "startTimestamp": timestamp_enable == true ? date : null
    }

    console.log(data);

    client.setActivity(data).catch(console.error);

}
