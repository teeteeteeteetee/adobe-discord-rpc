// i dont care if it theres duplicates i wanted everything to have their own function B) ill make it smaller in future also adobe is kinda eh so

//ae stuff
var AEItems;

function AETitle(){
    var info = app.project.file.displayName;
    return info;
}

function AEComp(){
    var info = app.project.activeItem.name;
    return info;
}

function AERender(){
    var info = app.project.renderQueue.rendering
    return info;
}

function AERenderNumItems(){
    var numItems = app.project.renderQueue.numItems
    AEItems = numItems

    return numItems;
}

function AERenderItems(){
    var info;
    var item;

    for (var index = 1; index < AEItems; index++) {

        item = app.project.renderQueue.item(index).status
        if(item === RQItemStatus.RENDERING){
            info = index + 1
            //stops looping
            index = AEItems
        }
    }

    return info;
}

function AETool(){
    var info = app.project.toolType
    return info
}

function PSTitle(){
    var info = app.activeDocument.name
    return info;
}

function PSLayer(){
    var info = app.activeDocument.activeLayer.name
    return info;
}

function PSTool(){
    var info = app.currentTool
    return info
}

function PPTitle(){

    //this thing is so stupid

    var info = "test"

    // if (!app.project) {
    //     info = "Idling";
    // } else {
    //     if(!app.project.name){
    //         info = "Idling"
    //     }else{
    //         info = (app.project.name)
    //     }
    // }

    // } else if(info === "Uncaught exception"){
    //     info = "Idle"
    // }
    // else {
    //     info = "Untitled Project.aep"
    // }

    return info;

}

function PPSequence(){
    var info;
    if (app.project.activeSequence) {
        info = app.project.activeSequence.name;
    } else {
        info = "No active sequence.";
    }
    return info
}

function PPTest(){
    var info =  app.properties

    return info
}

function AUTitle() {
    var info = app.activeDocument.displayName
    return info
}

function AUType() {
    var info = app.activeDocument.reflect.name
    switch(info){
        case "MultitrackDocument":
            info = "Multitrack Session"
            break;
        case "WaveDocument":
            info = "Audio File"
            break;
        case "Document":
            info = "CD Layout" 
            break;
    }
    return info
}

function ILTitle() {
    var info = app.activeDocument.name
    return info;
}

function ILLayer(){
    var info = app.activeDocument.activeLayer.name
    return info;
}