var csInterface = new CSInterface();
var appID, state, details, smallImageKey, smallImageText, largeImageText;
var stateCopy;
var detailsCopy;
var smallImageKeyCopy;
var smallImageTextCopy;
var largeImageTextCopy;

//server
csInterface.requestOpenExtension("com.tee.server");

window.onload = getApp();
appID = csInterface.getApplicationID()

getApp();

function getApp () {

    switch(appID){
        case "PHSP":
            break;
        case "PHXS":
            break;
        case "IDSN":
            break;
        case "AICY":
            break;
        case "ILST":
            break;
        case "PPRO":
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
                    response = "Idle"
                    smallImageKey = undefined
                } else {
                    smallImageKey = "edit"
                    smallImageText = `Editing ${details}`
                }
                state = response
            })

            put(appID, state, details, smallImageKey, smallImageText, largeImageText);

            break;
        case "ILST":
            break;
        case "FLPR":
            break;
        case "AUDT":
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

function put(appID, state, details, smallImageKey){

    if((state != stateCopy) || details != detailsCopy || smallImageKey != smallImageKeyCopy || smallImageText != smallImageTextCopy || largeImageText != largeImageTextCopy){
        let data = {
            "appID": appID,
            "state": state,
            "details": details,
            "smallImageKey": smallImageKey,
            "smallImageText": smallImageText,
            "largeImageText": largeImageText
        }
    
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:6767/rpc/',
            contentType: 'application/json',
            data: JSON.stringify(data), 
        })

        stateCopy = state;
        detailsCopy = details;
        smallImageKeyCopy = smallImageKey;
        smallImageTextCopy = smallImageText;
        largeImageTextCopy = largeImageText;

    }

    refresh(2e3)

}
