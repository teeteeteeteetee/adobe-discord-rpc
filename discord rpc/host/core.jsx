// function openDocument(x){
//     var fileRef = new File("~/Downloads/myFile.jpg");
//     var docRef = app.open(fileRef);
//   }

function AETitle(){
    var info = app.project.file.displayName;
    return info;
}

function AEComp(){
    var info = app.project.activeItem.name
    return info;
}