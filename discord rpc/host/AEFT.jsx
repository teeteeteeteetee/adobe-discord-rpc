//ae stuff
var AEItems;

function AETitle (){
    return app.project.file.displayName;
}

function AEComp (){
    return app.project.activeItem.name;
}

function AERender (){
    return app.project.renderQueue.rendering
}

function AERenderNumItems (){
    var numItems = app.project.renderQueue.numItems
    AEItems = numItems

    return numItems;
}

function AERenderItems(){
    var info;
    var item;

    for (var index = 1; index < AEItems + 1; index++) {

        item = app.project.renderQueue.item(index).status
        if(item === RQItemStatus.RENDERING){
            info = index
            //stops looping
            index = AEItems
        }
    }

    return info;
}

function AETool (){
    return app.project.toolType
}