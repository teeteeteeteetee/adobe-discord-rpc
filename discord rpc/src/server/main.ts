import { RPCClient } from "./rpc";
import * as active from "./active.json";

import * as express from "express";

const monitor = require("active-window");
const tcpPortUsed = require("tcp-port-used");

const app = express();
app.set("port", 6767);

let http = require("http").Server(app);

let io = require("socket.io")(http);

let _data: any = {};
let _client: any = {};
let appNames: any = active;
let currentApp: string;
let _window: any;

//run("AEFT");

const callback = function(window: any){

    _window = window.app;

    try {

        if(!appNames[window.app]) return;
        if(!_client[appNames[window.app]]){
            _client[appNames[window.app]] = new RPCClient(appNames[window.app]);
        }
 
        if(currentApp != appNames[window.app]){
            try{
                _client[currentApp].destroy();
                delete _client[currentApp];
                console.log(_client);
            }catch(err){

            }

            currentApp = appNames[window.app];

            let data = _data[appNames[window.app]];
            let client = _client[appNames[window.app]];
            
            client.details = data["details"];
            client.state = data["state"];
            client.smallImageKey = data["smallImageKey"];
            client.smallImageText = data["smallImageText"];
            client.largeImageText = data["largeImageText"];
            client.timestamp = data["timestamp"];
            client.partyMin = data["partySize"];
            client.partyMax = data["partyMax"];

            client.create();
        }

    }catch(err) {
        console.log(err)
    } 
  }

module.exports = run;

async function run(x : any) {

    try {

        tcpPortUsed.waitUntilFreeOnHost(6767, 'localhost', 5000, 60000)
        .then(function() {

            app.get('/', (req, res) => {
                res.sendFile(__dirname + '/index.html');
            });

            io.on("connection", (socket: any) => {
                console.log("someone connected");
                socket.on('rpc', (data: any) => {
                    console.log(data);
                    _data[data.appID] = data;
                    if(currentApp === data.appID){
                        _client[currentApp].details = data.details;
                        _client[currentApp].state = data.state;
                        _client[currentApp].smallImageKey = data.smallImageKey;
                        _client[currentApp].smallImageText = data.smallImageText;
                        _client[currentApp].largeImageText = data.largeImageText;
                        _client[currentApp].timestamp = data.timestamp;
                        _client[currentApp].partyMin = data.partySize;
                        _client[currentApp].partyMax = data.partyMax;
                        _client[currentApp].update();
                    }

                });
    
                socket.on('disconnect', () => {
                    
                });
            });
              
            http.listen(6767, function() {
                console.log("listening on *:6767");
            });

            monitor.getActiveWindow(callback, -1, 2);

        }, function(err: any) {
            run(x);
            throw err;
        });

    }catch(err){
        console.log(err);
    }

}
