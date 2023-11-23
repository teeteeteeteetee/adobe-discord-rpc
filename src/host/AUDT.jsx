/*
 * File: AUDT.jsx
 * Project: discord-rpc
 * File Created: Thursday, 23rd November 2023 11:19:04 am
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/teeteeteeteetee
 * Discord: Tee#0001
 * 
 * Last Modified: Thursday, 23rd November 2023 2:56:13 pm
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Demon Cat
 */
function state(){
    var x;
    try{
        switch(app.activeDocument.reflect.name){
            case "MultitrackDocument":
                x = "Multitrack Session";
                break;
            case "WaveDocument":
                x = "Audio File";
                break;
            case "Document":
                x = "CD Layout"; 
                break;
            default:
                x = app.activeDocument.reflect.name;
        }

    }catch(e){
        x = "Idling";
    }

    return x;

}

function details(){

    try{

    if(app.activeDocument && app.activeDocument.displayName){
        return app.activeDocument.displayName;
    }else{
        return "No file.";
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
    return "Adobe Audition";
}

function partySize(){
    return 0;
}

function partyMax(){
    return 0;
}