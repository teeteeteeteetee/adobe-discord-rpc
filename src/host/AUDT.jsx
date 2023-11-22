function state(){
    try{
        var x;
        switch(app.activeDocument.reflect.name){
            case "MultitrackDocument":
                x = "Multitrack Session";
                break;
            case "WaveDocument":
                x = "Audio File";
                break;
            case "Document":
                x = "CD Layout"; 
                break;
            default:
                x = "No file.";
        }

        return x;

    }catch(e){
        return "";
    }
    
}

function details(){

    try{

    if(app.activeDocument && app.activeDocument.displayName){
        return app.activeDocument.displayName;
    }else{
        return "";
    }

    }catch(e){
        return "";
    }
    
}

function smallImageKey(){

}

function smallImageText(){

}

function largeImageText(){
    return "Adobe Audition";
}

function partySize(){
    return 0;
}

function partyMax(){
    return 0;
}