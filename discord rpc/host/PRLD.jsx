function PLTitle(){
    return app.project.name

}

function PLApp(){
    return app.project
}

function state(){
    try{
            var x;
    if (app.project.activeSequence) {
        x = app.project.activeSequence.name;
    } else {
        x = "No active sequence.";
    }
    return x
    }catch(e){
        return "No active sequence.";
    }
}

function details(){
    try{
        return app.project.name
    }catch(e){
        return "No file."
    }

}

function smallImageKey(){

}

function smallImageText(){

}

function largeImageText(){
    return "Adobe Prelude";
}

function partySize(){

}

function partyMax(){

}