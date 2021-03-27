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

        switch (appID) {
            case "PHSP":

                largeImageText = "Adobe Photoshop"

                csInterface.evalScript('PSTitle()', response => {
                    if (response === ("EvalScript error.")) {
                        response = "Idling";
                    }
                    details = response
                })
                csInterface.evalScript('PSLayer()', response => {
                    if (response === ("EvalScript error.")) {
                        response = undefined
                        smallImageKey = undefined
                    } else {
                        smallImageText = `Editing ${details}`
                    }
                    console.log(response)
                    state = response
                })

                csInterface.evalScript('PSLayerMax()', response => {
                    partyMax = response;
                })
                csInterface.evalScript('PSLayerMin()', response => {
                    partySize = response;
                })

                csInterface.evalScript('PSTool()', response => {
                    var x = response.toLowerCase()
                    smallImageKey = x

                })

                break;
            case "PHXS":

                largeImageText = "Adobe Photoshop"

                csInterface.evalScript('PSTitle()', response => {
                    if (response === ("EvalScript error.")) {
                        response = "Idling";
                    }
                    details = response
                })
                csInterface.evalScript('PSLayer()', response => {
                    if (response === ("EvalScript error.")) {
                        response = undefined
                        smallImageKey = undefined
                    } else {
                        smallImageText = `Editing ${details}`
                    }
                    console.log(response)
                    state = response
                })

                csInterface.evalScript('PSLayerMax()', response => {
                    if (response === "EvalScript error.") {
                        response = 0
                    }
                    partyMax = response;
                })
                csInterface.evalScript('PSLayerMin()', response => {
                    if (response === "EvalScript error.") {
                        response = 0
                    }
                    partySize = response;
                })

                csInterface.evalScript('PSTool()', response => {
                    var x = response.toLowerCase()
                    smallImageKey = x

                })


                break;
            case "IDSN":
                largeImageText = "Adobe InDesign"

                csInterface.evalScript('IDTitle()', response => {
                    if (response === ("EvalScript error.")) {
                        response = "Idling";
                    }
                    details = response
                })

                csInterface.evalScript('IDPageName()', response => {
                    if (response === ("EvalScript error.")) {
                        response = undefined;
                    } else {
                        response = `Page: ${response}`
                    }
                    state = response
                })

                csInterface.evalScript('IDPageMax()', response => {
                    if (response === "EvalScript error.") {
                        response = 0
                    }
                    partyMax = response;
                })
                csInterface.evalScript('IDPageMin()', response => {
                    if (response === "EvalScript error.") {
                        response = 0
                    }
                    partySize = response;
                })

                break;
            case "AICY":
                break;
            case "ILST":

                largeImageText = "Adobe Illustrator"

                csInterface.evalScript('ILTitle()', response => {
                    if (response === ("EvalScript error.")) {
                        response = "Idling";
                    } else if (response.includes("Error 1302:")) {
                        response = "Idling";
                    }

                    details = response
                })

                csInterface.evalScript('ILLayer()', response => {
                    if (response === ("EvalScript error.")) {
                        response = undefined
                        smallImageKey = undefined
                    } else if (response.includes("Error 1302:")) {
                        response = undefined;
                    } else {
                        smallImageKey = "edit"
                        smallImageText = `Editing ${details}`
                    }
                    state = response
                })

                csInterface.evalScript('ILLayerMax()', response => {
                    if (response === "EvalScript error.") {
                        response = 0
                    }
                    partyMax = response;
                })
                csInterface.evalScript('ILLayerMin()', response => {
                    if (response === "EvalScript error.") {
                        response = 0
                    }
                    partySize = response;
                })


                break;
            case "PPRO":

                largeImageText = "Adobe Premiere Pro"
                csInterface.evalScript('PPTitle()', response => {
                    if (response === "EvalScript error.") {
                        response = "Idling"
                    } else {
                        csInterface.evalScript('PPSequence()', response => {
                            if (!response) {
                                response = "Idling"
                                smallImageKey = undefined
                            } else {
                                smallImageKey = "edit"
                                smallImageText = `Editing ${details}`
                            }
                            state = response
                        })
                    }
                    details = response
                })


                break;
            case "PRLD":

                largeImageText = "Adobe Prelude"

                csInterface.evalScript('PLTitle()', response => {
                    if (response === "EvalScript error.") {
                        response = "Idling"
                    } else {
                        csInterface.evalScript('PLSequence()', response => {
                            if (!response) {
                                response = "Idling"
                                smallImageKey = undefined
                            } else {
                                smallImageKey = "edit"
                                smallImageText = `Editing ${details}`
                            }
                            state = response
                        })
                    }
                    details = response
                })
                break;
            case "AEFT":

                largeImageText = "Adobe After Effects"

                csInterface.evalScript('AETitle()', response => {
                    if (!response) {
                        response = "Untitled Project.aep"
                    }
                    details = response
                })

                csInterface.evalScript('AEComp()', response => {
                    if (!response) {
                        response = "Idling"
                        smallImageText = `Editing ${details}`
                    } else {
                        smallImageText = `Editing ${details}`
                    }
                    state = response
                })

                csInterface.evalScript('AETool()', response => {
                    smallImageKey = response
                })

                csInterface.evalScript('AERender()', response => {
                    if (response === "true") {
                        csInterface.evalScript('AERenderNumItems()', response => {
                            if (!renderItemLock) {
                                renderItemLock = response
                            }
                            csInterface.evalScript('AERenderItems()', response => {
                                partySize = response
                            })
                            partyMax = renderItemLock
                        })
                        state = "Rendering"
                    } else {
                        renderItemLock = null;
                        partyMax = 0
                        partySize = 0
                    }
                })

                break;
            case "FLPR":

                largeImageText = "Adobe Animate"

                csInterface.evalScript('FLTitle()', response => {

                    details = response
                })

                csInterface.evalScript('FLLayer()', response => {

                    state = response
                })

                break;
            case "AUDT":

                largeImageText = "Adobe Audition"

                csInterface.evalScript('AUTitle()', response => {
                    if (response === "EvalScript error.") {
                        response = ""
                    }
                    details = response
                })

                csInterface.evalScript('AUType()', response => {
                    if (response === "EvalScript error.") {
                        response = "Idling"
                    }
                    state = response
                })

                break;
            case "DRWV":

                largeImageText = "Adobe Dreamweaver"

                break;
            case "RUSH":

                largeImageText = "Adobe Premiere Rush"

                break;
        }

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
        
    }, 3000);

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

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:6767/rpc/' + appID + '/data',
        contentType: 'application/json',
        data: JSON.stringify(data),
        error: function(request, status, error){
            console.log(request, status, error)
            if(request == 502){
                csInterface.requestOpenExtension("com.tee.server");
            }
        }
    })
}