function AUTitle() {
    return app.activeDocument.displayName
}

function AUType() {
    var info = app.activeDocument.reflect.name
    switch(info){
        case "MultitrackDocument":
            info = "Multitrack Session"
            break;
        case "WaveDocument":
            info = "Audio File"
            break;
        case "Document":
            info = "CD Layout" 
            break;
    }
    return info
}

function state(){

}

function details(){

}

function smallImageKey(){

}

function smallImageText(){

}

function largeImageText(){
    return "Adobe Audition";
}

function partySize(){

}

function partyMax(){

}