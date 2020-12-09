const express = require("express");
const app = express();
const fs = require('fs');
const config = require('./config')

var configServer = require("./config.json")
var rpc = require('./rpc')
var port = configServer.server.port

var apps = {};

//run()

module.exports = run;

function run() {

  try {

    connect();

    process.on('uncaughtException', (err) => {
      console.log(err)
      if (err.code === 'EADDRINUSE') {
        console.log("port is currently in use")
        setTimeout(function () { connect() }, 15000)

        return;
      }
    });

    function connect() {
      app.listen(port, 'localhost')
      config.create()
      console.log("connecting")
    }

    app.use(express.json())

    fs.readdir(__dirname + "\\..\\host", (err, files) => {

      files.forEach(file => {

        var _app = file.replace(".jsx", "");

        app.get(`/rpc/${_app}/config`, function (req, res) {
          res.send(config.load(_app))
        })

        app.put(`/rpc/${_app}/data`, function (req, res) {
          console.log(req.body)
          res.send(req.body)

          apps[_app] = req.body;

          rpc.run(JSON.stringify(apps))
        })
      })
    })

    app.get(`/rpc/user`, function (req, res) {
      res.send(rpc.user())
    })

    app.get('/', function (req, res) {
      res.send(`com.discord.rpc.tee`)
    });

  } catch (err) {
    throw err;
  }

}