function state(){
    try{
        return app.activeDocument.activeLayer.name;
    }catch(e){
        return "";
    }
}

function details(){
    try{
        return app.activeDocument.name;
    }catch(e){
        return "No file.";
    }
}

function smallImageKey(){

}

function smallImageText(){

}

function largeImageText(){
    return "Adobe Illustrator";
}

function partySize(){
    try{
        return app.activeDocument.activeLayer.zOrderPosition;
    }catch(e){
        return 0;
    }
}

function partyMax(){
    try{
        return app.activeDocument.layers.length;
    }catch(e){
        return 0;
    }
}