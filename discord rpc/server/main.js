const express = require("express");
const app = express();
const fs = require('fs');
const config = require('./config')
const CSInterface = require("../lib/CSInterface");

var tcpPortUsed = require('tcp-port-used');

var configServer = require("./config.json")
var port = configServer.server.port

var apps = {};

var host;

//run()

module.exports = run;

async function run(x) {

try {

   host = x;

console.log(x)

await config.create()

connect();

function connect(){

tcpPortUsed.waitUntilFreeOnHost(parseInt(port), 'localhost', 15000, 60000).then(function(){

  var rpc = require('./rpc')

    process.on('uncaughtException', (err) => {
      console.log(err)
      if (err.code === 'EADDRINUSE') {
        console.log("port is currently in use")
        setTimeout(function () { connect() }, 15000)

        return;
      }
    });

    app.listen(port, 'localhost')
    console.log("connecting")
    
    app.use(express.json())

    fs.readdir(__dirname + "\\..\\host", (err, files) => {

      files.forEach(file => {

        var _app = file.replace(".jsx", "");

        app.get(`/rpc/${_app}/settings`, function (req, res) {
          res.send(config.load(_app))
        })

        app.put(`/rpc/${_app}/settings`, function (req, res) {
          config.update(_app, req.body)
          res.send(req.body)
        })

        app.put(`/rpc/${_app}/data`, function (req, res) {
          console.log(req.body)
          res.send(req.body)

          apps[_app] = req.body;

          rpc.run(JSON.stringify(apps))

          app.get(`/rpc/${_app}/data`, function (req, res){
            res.send(apps[_app])
          })

        })
      })
    })

    app.get(`/rpc/user`, function (req, res) {
      res.send(rpc.user())
    })

    app.get('/', function (req, res) {
      res.send(`com.discord.rpc.tee ${host}`)
    });

  }).catch(err => {
    console.log(err)
    if(err.message === "timeout"){
      connect();
    }
    
  })

}

} catch (err) {
  console.log(err)
}

}

exports.killServer = function(){
  console.log("killed server")

  process.exit(1)
}

exports.host = function(){
  return host;
}
