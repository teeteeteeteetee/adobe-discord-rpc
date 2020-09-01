// function openDocument(x){
//     var fileRef = new File("~/Downloads/myFile.jpg");
//     var docRef = app.open(fileRef);
//   }

function AETitle(){
    var info = app.project.file.displayName;
    return info;
}

function AEComp(){
    var info = app.project.activeItem.name;
    return info;
}

function PSTitle(){
    var info = app.activeDocument.name
    return info;
}

function PSLayer(){
    var info = app.activeDocument.activeLayer.name
    return info;
}

function PPTitle(){
    var info = app.project.name
    return info
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