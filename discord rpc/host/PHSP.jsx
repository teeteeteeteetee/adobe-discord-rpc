function state(){
    try{
        return app.activeDocument.activeLayer.name;
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

        return app.activeDocument.activeLayer.itemIndex;

    }catch(e){
        return 0;
    }
}

function partyMax(){
    try{

        var all_layers = 0;

        if(app.activeDocument.layerSets.length !== 0){

            for (var i=0, len=app.activeDocument.layerSets.length; i < len ; i++) {
              all_layers = all_layers + app.activeDocument.layerSets[i].layers.length + app.activeDocument.layerSets.length
            };
        }

        return app.activeDocument.layers.length + all_layers;
    }catch(e){
        return 0;
    }
}