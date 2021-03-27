function PPTitle(){

    //this thing is so stupid

    return app.project.name

}

function PPSequence(){
    var info = undefined
    var sequence = app.project.activeSequence
    if (sequence) {
        info = sequence.name+" ("+ app.project.rootItem.children.numItems+ ")";
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