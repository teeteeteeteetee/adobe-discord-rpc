var FLTitle2;

function FLTitle(){
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

function FLLayer(){
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