function state(){
    var x = app.activeDocument.reflect.name
        switch(info){
            case "MultitrackDocument":
                info = "Multitrack Session";
                break;
            case "WaveDocument":
                info = "Audio File";
                break;
            case "Document":
                info = "CD Layout"; 
                break;
        }

    return x;
    
}

function details(){
    return app.activeDocument.displayName
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