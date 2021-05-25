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
let appNames: any;
let currentApp: string;
let _window: any;
let initApp: string;
let isInitApp: boolean = true;

//run("AEFT");

const callback = function(window: any){

    _window = window.app;

    try {

        if(!appNames[_window]) {
            if(isInitApp){
                _window = initApp;
                isInitApp = false;

                for (var key in appNames) {
                    if(appNames[key] === _window){
                        _window = key;
                    }
                }

            }else{
                return;
            }
        }
        if(!_client[appNames[_window]]){
            _client[appNames[_window]] = new RPCClient(appNames[_window]);
        }
 
        if(currentApp != appNames[_window]){
            try{
                _client[currentApp].destroy();
                delete _client[currentApp];
                console.log(_client);
            }catch(err){

            }

            currentApp = appNames[_window];

            let data = _data[appNames[_window]];
            let client = _client[appNames[_window]];
        
                client.details = !data ? undefined : data["details"];
                client.state = !data ? undefined : (data["state"] === ""? undefined : data["state"]);
                client.smallImageKey = !data ? undefined : data["smallImageKey"];
                client.smallImageText = !data ? undefined : data["smallImageText"];
                client.largeImageText = !data ? undefined : data["largeImageText"];
                if(data){
                    client.timestamp = data["timestamp"];
                    client.partyMin = data["partySize"];
                    client.partyMax = data["partyMax"];
                }

            client.create();
        }

    }catch(err) {
        console.log(err)
    } 
  }

module.exports = run;

async function run(x : any) {

    try {

        console.log(x);

        initApp = x;
        appNames = active;

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
