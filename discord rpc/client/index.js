var csInterface = new CSInterface();
var appID = "", state = "", details = "", smallImageKey = "", smallImageText = "", largeImageText = "", partySize = 0, partyMax = 0;
var timestamp = Math.floor(Date.now() / 1000)
var valueChanged = false;

//ae stuff
var renderItemLock;

function loadJSX(fileName) {
    var csInterface = new CSInterface();
    var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/host/";
    csInterface.evalScript('$.evalFile("' + extensionRoot + fileName + '")');
}

//server
csInterface.requestOpenExtension("com.tee.server");

//socket io v3
const socket = io('ws://localhost:6767');

appID = csInterface.getApplicationID()

loadJSX(appID + ".jsx");
getApp();

function getAppID() {

    var csInterface = new CSInterface();
    var appID = csInterface.getApplicationID()
    return appID
}

rpc = {

    data: [],

    aListener: function(val){},

    set state(val) {
        this.data[0] = val;
        this.aListener(val);
    },
    get state() {
        return this.data[0];
    },
    set details(val) {
        this.data[1] = val;
        this.aListener(val);
    },
    get details() {
        return this.data[1];
    },
    set smallImageKey(val) {
        this.data[2] = val;
        this.aListener(val);
    },
    get smallImageKey() {
        return this.data[2];
    },
    set smallImageText(val) {
        this.data[3] = val;
        this.aListener(val);
    },
    get smallImageText() {
        return this.data[3];
    },
    set largeImageText(val) {
        this.data[4] = val;
        this.aListener(val);
    },
    get largeImageText() {
        return this.data[4];
    },
    set partySize(val) {
        this.data[5] = val;
        this.aListener(val);
    },
    get partySize() {
        return this.data[5];
    },
    set partyMax(val) {
        this.data[6] = val;
        this.aListener(val);
    },
    get partyMax() {
        return this.data[6];
    },
    registerListener: function(listener){
        this.aListener = listener;
    }
    
}

rpc.registerListener(function(val) {
    console.log(`Value changed to: ${val}`)
    valueChanged = true;
  });


function getApp() {

    setInterval(() => {
        csInterface.evalScript('state()', x => state = x);
        csInterface.evalScript('details()', x => details = x);
        csInterface.evalScript('smallImageKey()', x => smallImageKey = x);
        csInterface.evalScript('smallImageText()', x => smallImageText = x);
        csInterface.evalScript('largeImageText()', x => largeImageText = x);
        csInterface.evalScript('partySize()', x => partySize = x);
        csInterface.evalScript('partyMax()', x => partyMax = x);

        if(rpc.state != state) rpc.state = state;
        if(rpc.details != details) rpc.details = details;
        if(rpc.smallImageKey != smallImageKey) rpc.smallImageKey = smallImageKey;
        if(rpc.smallImageText != smallImageText) rpc.smallImageText = smallImageText;
        if(rpc.largeImageText != largeImageText) rpc.largeImageText = largeImageText;
        if(rpc.partySize != partySize) rpc.partySize = partySize;
        if(rpc.partyMax != partyMax) rpc.partyMax = partyMax;

        if(valueChanged){
            send();
            valueChanged = false;
        }
        
    }, 1000);

}

function send(){
    let data = {
        "appID": appID,
        "state": state,
        "details": details,
        "smallImageKey": smallImageKey,
        "smallImageText": smallImageText,
        "largeImageText": largeImageText,
        "partySize": partySize,
        "partyMax": partyMax,
        "timestamp": timestamp
    }

    socket.emit('rpc', data);

}