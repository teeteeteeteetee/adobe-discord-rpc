function PLTitle(){
    return app.project.name

}

function PLApp(){
    return app.project
}

function PLSequence(){
    var info;
    if (app.project.activeSequence) {
        info = app.project.activeSequence.name;
    } else {
        info = "No active sequence.";
    }
    return info
}

function state(){

}

function details(){

}

function smallImageKey(){

}

function smallImageText(){

}

function partySize(){

}

function partyMax(){

}