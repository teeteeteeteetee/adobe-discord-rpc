const RPC = require('discord-rpc');

const client = new RPC.Client({ transport: 'ipc' });
const date = new Date();

var apps = require(__dirname+'\\apps.json');

var csInterface = new CSInterface();
var appID = csInterface.getApplicationID()
var valueChanged = false;

function loadJSX(fileName) {
    var csInterface = new CSInterface();
    var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/host/";
    csInterface.evalScript('$.evalFile("' + extensionRoot + fileName + '")');
}

client.on('ready', () => {
    send();
})

client.login({
    clientId: apps[appID]
}).catch(console.error);

loadJSX(appID + ".jsx");
getData();

function getAppID() {
    var csInterface = new CSInterface();
    var appID = csInterface.getApplicationID()
    return appID
}

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

    let data = {
        "appID": appID,
        "state": rpc.state.length <= 2 ? `[${rpc.state}]` : rpc.state,
        "details": rpc.details,
        "smallImageKey": rpc.smallImageKey,
        "largeImageKey": "logo",
        "smallImageText": rpc.smallImageText,
        "largeImageText": rpc.largeImageText,
        "partySize": rpc.partySize,
        "partyMax": rpc.partyMax,
        "startTimestamp": date
    }

    client.setActivity(data).catch(console.error);

}