import { RPCClient } from "./rpc";

import * as express from "express";
import * as socketio from "socket.io";

const app = express();
app.set("port", 6767);

let http = require("http").Server(app);

let io = require("socket.io")(http);

module.exports = run;

async function run(x : any) {

    try {

        const waitport = require("wait-port");
        console.log(waitport)

        const client = new RPCClient();
        client.create();

    }catch(err){
        console.log(err);
    }
}