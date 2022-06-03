// gonna rewrite this sphagetti in future

var csInterface = new CSInterface();

switch(csInterface.getApplicationID()){
    case "DRWV": 
        csInterface.requestOpenExtension("com.tee.discordrpc.other.dreamweaver");
        break;
    case "FLPR":
        csInterface.requestOpenExtension("com.tee.discordrpc.other.animate");
        break;
}

var i = 0

var details = document.getElementById("details")
var state = document.getElementById("state")
var timestamp = document.getElementById("timestamp")
var enabled = document.getElementById("enabled")

var current_avatar = "";

var data;

var appID = csInterface.getApplicationID()

var settings_event = new CSEvent("com.discordrpc.settings", "APPLICATION");
var settingsRequest_event = new CSEvent("com.discordrpc.settings.request", "APPLICATION");

document.getElementById("settings").onclick = function () {
    csInterface.requestOpenExtension("com.tee.discordrpc.settings");
}

csInterface.addEventListener('com.discordrpc.restart', function(){
    window.location.reload();
});

csInterface.dispatchEvent(settingsRequest_event);
console.log("dispatching")

var once = false;
csInterface.addEventListener('com.discordrpc.settings.get', function (e) {

    var data = e.data;
    console.log(data);
    console.log("event")

    if(!once){
        once = true;
        localStorage.setItem("settings", JSON.stringify(data));
    }

});

if(localStorage.getItem("settings") === null){
    var get_settings = setInterval(() => {
        csInterface.dispatchEvent(settingsRequest_event);
        if(localStorage.getItem("settings") != null) {
            clearInterval(get_settings)
            window.location.reload();
        };
    }, 5000);
}

var temp = JSON.parse(localStorage.getItem("settings"));

console.log(temp)

details.checked = temp.details;
state.checked = temp.state;
timestamp.checked = temp.timestamp;
enabled.checked = temp.enabled;

$(document).ready(function () {

    document.getElementById("_title").innerHTML = getAppName(appID)

    csInterface.addEventListener('com.discordrpc.data', function (e) {

        var _data = e.data;

        console.log(_data)
        data = _data
        details.disabled = false
        state.disabled = false
        timestamp.disabled = false
        enabled.disabled = false

        try {
            updateSettings()

            document.getElementById("_details").style.display = "block"
            document.getElementById("_state").style.display = "block"
            document.getElementById("_timestamp").style.display = "block"
        } catch (err) {

        }
    });





    resize();
    setInterval(() => {
        try {
            document.getElementById("_timestamp").innerHTML = `${format(i++)} elapsed`
        } catch (err) {

        }

    }, 1000);

});

function format(seconds) {
    var numhours = parseInt(Math.floor(((seconds % 31536000) % 86400) / 3600), 10);
    var numminutes = parseInt(Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), 10);
    var numseconds = parseInt((((seconds % 31536000) % 86400) % 3600) % 60, 10);

    if (numhours == "00") {
        return ((numminutes < 10) ? "0" + numminutes : numminutes)
            + ":" + ((numseconds < 10) ? "0" + numseconds : numseconds);
    } else {
        return ((numhours < 10) ? "0" + numhours : numhours)
            + ":" + ((numminutes < 10) ? "0" + numminutes : numminutes)
            + ":" + ((numseconds < 10) ? "0" + numseconds : numseconds);
    }
}

function resize() {

    var visualizerName = document.getElementById("visualizerName")
    var visualizer = document.getElementById("visualizer")
    if (visualizerName.clientHeight >= 30) {
        visualizer.setAttribute("style", "max-height:14rem")
    } else if (visualizerName.clientHeight == 0) {
        visualizer.setAttribute("style", "max-height:12rem")
    } else if (visualizerName.clientHeight >= 10) {
        visualizer.setAttribute("style", "max-height:13rem")
    }

}

function add3Dots(string, limit) {
    var dots = "...";
    if (string.length > limit) {
        string = string.substring(0, limit) + dots;
    }

    return string;
}

function updateSettings(x) {

    var _i = 0

    var details = document.getElementById("_details")
    var state = document.getElementById("_state")
    var timestamp = document.getElementById("_timestamp")

    if (x == true) {
        var xy = {
            "details": document.getElementById("details").checked,
            "state": document.getElementById("state").checked,
            "timestamp": document.getElementById("timestamp").checked,
            "enabled": document.getElementById("enabled").checked,
        }

        settings_event.data = xy;
        csInterface.dispatchEvent(settings_event);
        localStorage.setItem("settings", JSON.stringify(xy));

    }

    function updateElements(x, y) {

        if (document.getElementById(x).checked) {

            try {
                y.parentNode.removeChild(y)
            } catch (err) {

            }

            if (data[x] === "") _i++

            var tag = document.createElement("div");
            var element = document.getElementById("_text");
            tag.setAttribute("id", `_${x}`)
            tag.setAttribute("class", "visualizerText")
            if (x === "timestamp") {
                tag.innerHTML = format(i++) + " elapsed"
            } else {
                tag.innerHTML = add3Dots(data[x], 20)

            }
            var element = document.getElementById("_text");
            element.appendChild(tag);

        } else if (document.getElementById(`_${x}`)) {
            y.parentNode.removeChild(y)
            _i++
        } else {
            _i++
        };
    }

    //lol
    updateElements("details", details)
    updateElements("state", state)
    updateElements("timestamp", timestamp)

    switch (_i) {
        case 0:
            document.getElementById("_title").setAttribute("style", "padding-top:0px")
            break;

        case 1:
            document.getElementById("_title").setAttribute("style", "padding-top:6px")
            break;

        case 2:
            document.getElementById("_title").setAttribute("style", "padding-top:12px")
            break;

        case 3:
            document.getElementById("_title").setAttribute("style", "padding-top:18px")
            break;
    }

    console.log(_i)

}

csInterface.addEventListener('com.discordrpc.user', function (e) {
    var data = e.data;
    if (current_avatar != `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}`) {
        document.getElementById("visualizerName").innerHTML = data.username + `<span style="font-family:Roboto-Light">#${data.discriminator}</span>`
        document.getElementById("avatar").src = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}`
        resize()
        updateSettings()
    }
});

