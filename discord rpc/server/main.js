const express = require("express");
const app = express();
const fs = require('fs');

var config = require("./config.json")
var port = config.server.port

var apps = {};

module.exports = run;

function run(){

try{

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

fs.readdir(__dirname+"\\..\\host", (err, files) => {
  
files.forEach(file => {
  var _app = file.replace(".jsx", "");
app.put(`/rpc/${_app}`, function (req, res) {
      console.log(req.body)
      res.send(req.body)
    
      apps[_app] = req.body;

      var rpc = require('./rpc')
      rpc(JSON.stringify(apps))
    })
  })
})

app.get('/', function (req, res) { 
    res.send(`com.discord.rpc.tee`)
});

}catch(err){
  throw err;
}
   
}