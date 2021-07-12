function state(){
    try{
        return app.activeDocument.activeLayer.name
    }catch(err){
        switch(err.description){
            case "No such element":
                return "Idling";

            default:
                return "";
        }
    }
}

function details(){
    try{
        return app.activeDocument.name

    }catch(err){
        switch(err.description){
            case "No such element":
                return "No file."
            break;

            default:
                return "";
        }
    }
}

function smallImageKey(){
    try{
        return app.currentTool.toString().toLowerCase();
    }catch(e){
        return "";
    }
}

function smallImageText(){
    try{
        if(state === "") return "";
        return "Editing " + state();
    }catch(e){
        return "";
    }
}

function largeImageText(){
    return "Adobe Photoshop";
}

function partySize(){
    try{

        //if(app.activeDocument.activeLayer instanceof LayerSet){
        //    return app.activeDocument.activeLayer.itemIndex - 1;
        //}else{
            return app.activeDocument.activeLayer.itemIndex;
        //}

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