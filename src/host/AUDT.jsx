function state(){
    var x;
    try{
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
                x = app.activeDocument.reflect.name;
        }

    }catch(e){
        x = "No file.";
    }

    return x;

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