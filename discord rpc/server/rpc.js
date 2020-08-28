exports.rpc = function(version) {
    const RPC = require("discord-rpc");
    const rpc = new RPC.Client({
        transport: "ipc"
    });
    
    const apps = require("./adobe.json")
    
    var app;
    var exec = require('child_process').exec;
    
    exec('tasklist', function(err, stdout, stderr) {
    
        var output = stdout.toLowerCase()
    
    for (let index = 0; index < apps.adobe.length; index++) {
        const element = apps.adobe[index]
    
        var check = output.includes(element.processExe)
        if(check == true){
            app = element.processExe
            console.log(app)
        }
    }
    
    });
    
    rpc.on("ready", () => {
        rpc.setActivity({
            largeImageKey: "logo"
        })
    })
    
    rpc.login({
        clientId: "748568089939148832"
    })
}
