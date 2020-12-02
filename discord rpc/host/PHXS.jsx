function PSTitle(){
    try{
        return app.activeDocument.name

    }catch(err){
        switch(err.description){
            case "No such element":
                return "Idling"
            break;

            default:
                return "";
        }
    }
    //return app.activeDocument.name
}

function PSLayer(){
    try{
        return app.activeDocument.activeLayer.name
    }catch(err){
        switch(err.description){
            case "No such element":
                return "";

            default:
                return "";
        }
    }
}

function PSLayerMax(){
    return app.activeDocument.layers.length
}

function PSLayerMin(){
    return app.activeDocument.activeLayer.itemIndex
}

function PSTool(){
    return app.currentTool
}