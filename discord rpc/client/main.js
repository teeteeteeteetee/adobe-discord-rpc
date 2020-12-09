var csInterface = new CSInterface();

var i = 0

var details = document.getElementById("details") 
var state =  document.getElementById("state")
var timestamp = document.getElementById("timestamp")
var enabled = document.getElementById("enabled")

console.log("here")
var appID = csInterface.getApplicationID()
console.log("and")

$(document).ready(function() {
$.getJSON(`${csInterface.getSystemPath(SystemPath.USER_DATA)}/adobe-discord-rpc/config.json`, function(data){
     
        details.checked = data[appID].details;
        state.checked = data[appID].state;
        timestamp.checked = data[appID].timestamp;
        enabled.checked = data[appID].enabled;

    });

    resize();
    getUser();
    setInterval(() => {
    document.getElementById("_timestamp").innerHTML = `${format(i++)} elapsed`

}, 1000);

    document.getElementById("appIcon").src = `./assets/${appID}.png`
});

function format(seconds)
{
var numhours = parseInt(Math.floor(((seconds % 31536000) % 86400) / 3600),10);
var numminutes = parseInt(Math.floor((((seconds % 31536000) % 86400) % 3600) / 60),10);
var numseconds = parseInt((((seconds % 31536000) % 86400) % 3600) % 60,10);

    if(numhours == "00"){
        return ((numminutes<10) ? "0" + numminutes : numminutes)
        + ":" + ((numseconds<10) ? "0" + numseconds : numseconds);
    } else {
        return ((numhours<10) ? "0" + numhours : numhours)
        + ":" + ((numminutes<10) ? "0" + numminutes : numminutes)
        + ":" + ((numseconds<10) ? "0" + numseconds : numseconds);
    }
}

function resize(){

    var visualizerName = document.getElementById("visualizerName")
    var visualizer = document.getElementById("visualizer")
    if(visualizerName.clientHeight >= 30){
        visualizer.setAttribute("style", "max-height:14rem")
    }else if(visualizerName.clientHeight == 0){
        visualizer.setAttribute("style", "max-height:12rem")
    }else if(visualizerName.clientHeight >= 10){
        visualizer.setAttribute("style", "max-height:13rem")
    }
      
}

function add3Dots(string, limit)
{
  var dots = "...";
  if(string.length > limit)
  {
    // you can also use substr instead of substring
    string = string.substring(0,limit) + dots;
  }

    return string;
}

console.log(add3Dots("Hello, how are you doing today?", 10));

function updateSettings(){

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:6767/rpc/' + appID + '/settings',
        contentType: 'application/json',
        data: JSON.stringify({
            "details": document.getElementById("details").checked,
            "state": document.getElementById("state").checked,
            "timestamp": document.getElementById("timestamp").checked,
            "enabled": document.getElementById("enabled").checked,
        }),
        error: function(request, status, error){
            console.log(request, status, error)
            if(request == 502){
                csInterface.requestOpenExtension("com.tee.server");
            }
        }
    })
}

function getUser(){
    var timer = setInterval(() => {

        $.ajax({
            type: 'GET',
            url: 'http://localhost:6767/rpc/user',
            contentType: 'application/json',
            success: function(data){

                console.log (data)

                document.getElementById("visualizerName").innerHTML = data.username + `<span style="font-family:Roboto-Light">#${data.discriminator}</span>`
                document.getElementById("avatar").src = data.avatarURL
                resize()
                clearInterval(timer)
            }
        })
    }, 15000);

}

function update() {

    $.getJSON(`http://localhost:6767/rpc/${getAppID()}/config`, function(data){
     
        console.log(getJSON)

    });
}