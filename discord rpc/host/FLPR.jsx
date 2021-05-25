var FLTitle2;

function state(){
    try{
        if(document.name){
            var i = fl.getDocumentDOM().getTimeline().currentLayer;
            var info = fl.getDocumentDOM().getTimeline().layers[i].name
        }
    }catch(err){

        if(err){
            info = "Testing Movie";
        }
    }

    return info;
}

function details(){
    var info;

    try{
        if(document.name){
            info = document.name
            FLTitle2 = info;
        }
    }catch(err){

        if(err){
            info = FLTitle2;
        }
    }

    return info;
}

function smallImageKey(){

}

function smallImageText(){

}

function largeImageText(){
    return "Adobe Animate";
}

function partySize(){
    return 0;
}

function partyMax(){
    return 0;
}