function PSTitle(){
    return app.activeDocument.name
}

function PSLayer(){
    return app.activeDocument.activeLayer.name
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