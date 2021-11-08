function state(){
    try{
        return "Page: "+app.activeWindow.activePage.name;
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
    return ""
}

function smallImageText(){
    return ""
}

function largeImageText(){
    return "Adobe InDesign";
}

function partySize(){
    try{
        return app.activeWindow.activePage.name;
    }catch(e){
        return 0;
    }
}

function partyMax(){
    try{
        return app.activeDocument.pages.length.toString();
    }catch(e){
        return 0;
    }
}