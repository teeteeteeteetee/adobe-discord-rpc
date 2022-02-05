//theres now try-catch because of AEFT 2019 and below

//ae stuff
var AEItems;
var renderItemLock;
var comp

//try catch for 2019 versions

function state(){

    try{
        var x = app.project.activeItem.name;

        if(app.project.renderQueue.rendering){
            return "Rendering"
        }

        if(app.project.activeItem instanceof CompItem) {
            comp = app.project.activeItem.name + " (" + app.project.activeItem.layers.length + ")";
            x = app.project.activeItem.name + " (" + app.project.activeItem.layers.length + ")";
        };

        for(var i = 1; i <= app.project.numItems; i++){
          if(app.project.item(i) instanceof CompItem) {
              if(app.project.activeItem instanceof CompItem) return x;
              return app.project.activeItem.name;
          }
        }

        //clear comp
        comp = undefined
        return x;
    }catch(e){
        //ig im not allowed to use if(!comp)
        if(!comp) return "No composition."; 
        return comp;
    }

}

function details(){
    try{
        var x = app.project.file.displayName;

        if(!x){
            x = "Untitled Project.aep";
        }

        return x;
    }catch(e){
        return "Untitled Project.aep";
    }
}

function smallImageKey(){
    try{
        return app.project.toolType;
    }catch(e){
        return "";
    }
}

function smallImageText(){
    try{
        return "Editing " + details();
    }catch(e){
        return "";
    }
}

function largeImageText(){
    return "Adobe After Effects";
}

function partySize(){
    try{
        if(app.project.renderQueue.rendering){
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

        }else{
            return 0;
        }
    }catch(e){
        return 0;
    }
}

function partyMax(){
    try{
        if(app.project.renderQueue.rendering == true){
            if (!renderItemLock) {
                AEItems = app.project.renderQueue.numItems
                renderItemLock = app.project.renderQueue.numItems
            }
            
            return renderItemLock;

        }else{
            renderItemLock = null;
            return 0;
        }
    }catch(e){
        return 0;
    }
}