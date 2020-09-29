function IDTitle(){
    return app.activeDocument.name
}

function IDPageName(){

    var info = app.activeWindow.activePage

    return info.name;
}

function IDPageMax(){

    var info = app.activeDocument.pages

    //braindead code it wants the return to be toString() for 0 reasons
    return info.length.toString();
}

function IDPageMin(){
    
    var info = app.activeWindow.activePage

    return info.name;
}