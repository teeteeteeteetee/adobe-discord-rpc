const express = require("express");
const app = express();

var config = require("./config.json")

var port = config.server.port

module.exports = run;

function run(){

/* Start the server */
connect()

app.on('error', function(err) {
    if (err.code === 'EADDRINUSE') {
      console.log("port is currently in use")
      setTimeout(function(){ connect()}, 30000)
    }
});

function connect(){
    app.listen(port)
    console.log("connecting")
}

app.get("/version", (req, res, next) => {
    res.send("ok")
});
   
}