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
                x = "";
        }

        return x;

    }catch(e){
        return "";
    }
    
}

function details(){

    try{

    if(app.activeDocument && app.activeDocument.reflect.name){
        return app.activeDocument.reflect.name;
    }else{
        return "No file.";
    }

    }catch(e){
        return "";
    }

    return app.activeDocument.reflect.name;
    
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