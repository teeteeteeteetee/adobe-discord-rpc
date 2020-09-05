/*

    im not bothered to find the way to make strings to be listened so theres a loop for it im sorry, dm me if u can help me with it

*/

var csInterface = new CSInterface();
var appID, state, details, smallImageKey, smallImageText, largeImageText;
var stateOld, detailsOld, smallImageKeyOld, smallImageTextOld, largeImageTextOld;

var partySize = 0
var partyMax = 0

//ae stuff
var renderItemLock;

//server
csInterface.requestOpenExtension("com.tee.server");

window.onload = getApp();
appID = csInterface.getApplicationID()

var button = document.querySelector("#button");
button.addEventListener("click", csInterface.requestOpenExtension("com.tee.server"));

getApp();

function getAppID () {

    var csInterface = new CSInterface();

    var appID = csInterface.getApplicationID()

    return appID
}


function getApp () {

    switch(appID){
        case "PHSP":

            largeImageText = "Adobe Photoshop"

            csInterface.evalScript('PSTitle()', response => {
                if(response === ("EvalScript error.")){
                    response = "Idling";
                }
                details = response
            })
            csInterface.evalScript('PSLayer()', response => {
                if(response === ("EvalScript error.")){
                    response = undefined
                    smallImageKey = undefined
                } else {
                    smallImageKey = "edit"
                    smallImageText = `Editing ${details}`
                }
                console.log(response)
                state = response
            })


              

            break;
        case "PHXS":
        
            largeImageText = "Adobe Photoshop"

            csInterface.evalScript('PSTitle()', response => {
                if(response === ("EvalScript error.")){
                    response = "Idling";
                }
                details = response
            })
            csInterface.evalScript('PSLayer()', response => {
                if(response === ("EvalScript error.")){
                    response = undefined
                    smallImageKey = undefined
                } else {
                    smallImageKey = "edit"
                    smallImageText = `Editing ${details}`
                }
                console.log(response)
                state = response
            })

            put(appID, state, details, smallImageKey, smallImageText, largeImageText, partySize, partyMax);
            
            break;
        case "IDSN":
            break;
        case "AICY":
            break;
        case "ILST":

            largeImageText = "Adobe Illustrator"

            csInterface.evalScript('ILTitle()', response => {
                if(response === ("EvalScript error.")){
                    response = "Idling";
                }
                details = response
            })

            csInterface.evalScript('PSLayer()', response => {
                if(response === ("EvalScript error.")){
                    response = undefined
                    smallImageKey = undefined
                } else {
                    smallImageKey = "edit"
                    smallImageText = `Editing ${details}`
                }
                state = response
            })

            put(appID, state, details, smallImageKey, smallImageText, largeImageText, partySize, partyMax);

            break;
        case "PPRO":

            largeImageText = "Adobe Premiere Pro"
            csInterface.evalScript('PPTitle()', response => {
                if(!response){
                    response = "Untitled Project.aep"
                }
                details = response
            })
    
            csInterface.evalScript('PPSequence()', response => {
                if(!response){
                    response = "Idling"
                    smallImageKey = undefined
                } else {
                    smallImageKey = "edit"
                    smallImageText = `Editing ${details}`
                }
                state = response
            })

            put(appID, state, details, smallImageKey, smallImageText, largeImageText, partySize, partyMax);

            break;
        case "PRLD":
            break;
        case "AEFT": 

        largeImageText = "Adobe After Effects"
    
            csInterface.evalScript('AETitle()', response => {
                if(!response){
                    response = "Untitled Project.aep"
                }
                details = response
            })
    
            csInterface.evalScript('AEComp()', response => {
                if(!response){
                    response = "Idling"
                    smallImageKey = undefined
                } else {
                    smallImageKey = "edit"
                    smallImageText = `Editing ${details}`
                }
                state = response
            })

            csInterface.evalScript('AERender()', response => {                
                if(response === "true"){
                    csInterface.evalScript('AERenderNumItems()', response => {
                        if(!renderItemLock){
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

            put(appID, state, details, smallImageKey, smallImageText, largeImageText, partySize, partyMax);

            break;
        case "FLPR":
            break;
        case "AUDT":

            largeImageText = "Adobe Audition"

            csInterface.evalScript('AUTitle()', response => {
                if(response === "EvalScript error."){
                    response = undefined
                }
                details = response
            })
    
            csInterface.evalScript('AUType()', response => {
                if(response === "EvalScript error."){
                    response = "Idling"
                }
                state = response
            })

            put(appID, state, details, smallImageKey, smallImageText, largeImageText, partySize, partyMax);

            break;
        case "DRWV":
            break;
        case "MUSE":
            break;
        case "KBRG":
            break;
    
    }
    
}

function refresh(timer){
    setTimeout(function(){ getApp()}, timer)
}

function put(appID, state, details, smallImageKey, smallImageText, largeImageText, partySize, partyMax){

    if(state != stateOld || details != detailsOld || smallImageKey != smallImageKeyOld || smallImageText != smallImageTextOld || largeImageText != largeImageTextOld || partyMax || partySize){
        let data = {
            "appID": appID,
            "state": state,
            "details": details,
            "smallImageKey": smallImageKey,
            "smallImageText": smallImageText,
            "largeImageText": largeImageText,
            "partySize": partySize, 
            "partyMax": partyMax
        }
        
            $.ajax({
                type: 'PUT',
                url: 'http://localhost:6767/rpc/',
                contentType: 'application/json',
                data: JSON.stringify(data), 
            })

            stateOld = state 
            detailsOld = details
            smallImageKeyOld = smallImageKey
            smallImageTextOld = smallImageText
            largeImageTextOld = largeImageText
    }

    refresh(2e3)

}
