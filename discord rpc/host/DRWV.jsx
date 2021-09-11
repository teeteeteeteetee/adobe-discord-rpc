function state(){

    try{
        switch(dw.getDocumentDOM().getView()){
            case "code":
                return "Mode: Code"
                break;
            case "split":
                return "Mode: Split"
                break;
            case "design":
                return "Mode: Live"
                break;
            case "":
            default: 
                return "Idling";
        }
    }catch(e){
        return "Idling"
    }



}

function details(){

    try{

        if(dw.getDocumentDOM().URL === ""){
            return "Untitled";
        }else{
            return (dw.getDocumentDOM().URL).split("/").pop();
        }

    }catch(e){
        return "No file.";
    }
    
}

function smallImageKey(){

}

function smallImageText(){

}

function largeImageText(){
    return app.appName;
}

function partySize(){
    return 0;
}

function partyMax(){
    return 0;
}