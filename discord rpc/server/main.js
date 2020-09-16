const express = require("express");
const app = express();

var config = require("./config.json")
var rpc = require("./rpc")
var port = config.server.port
var lock;

module.exports = run;

run()

function run(x){

try{

  lock = x;

    connect();

process.on('uncaughtException', (err) => {
    console.log(err)
    if (err.code === 'EADDRINUSE') {
      console.log("port is currently in use")
      setTimeout(function(){ connect()}, 15e3)

      return;
    }
});

function connect(){
    app.listen(port, 'localhost')
    console.log("connecting")
}

app.use(express.json())

app.get('/', function (req, res) { 
    res.send(`com.discord.rpc.tee ${lock}`)
});

app.put('/rpc', function (req, res) {
    console.log(req.body)
    res.send(req.body)

    var jsonBody = req.body;

    if(!lock){
      lock = jsonBody.appID
    }
    if(lock != jsonBody.appID){
      return;
    }

    rpc(jsonBody.appID, jsonBody.state, jsonBody.details, jsonBody.smallImageKey, jsonBody.smallImageText, jsonBody.largeImageText, jsonBody.partySize, jsonBody.partyMax)

  })

}catch(err){
  console.error(err);
}
   
}