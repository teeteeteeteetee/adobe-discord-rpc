const app = require('express')();
const http = require('http').createServer(app);
const fs = require('fs');
const config = require('./config')

var tcpPortUsed = require('tcp-port-used');
var configServer = require("./config.json")
var port = configServer.server.port

var rpc = require('./rpc');
const { json } = require('express');
var apps = {};
var socketID = {};
var host;

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

//run();

module.exports = run;

async function run(x) {

    try {

        app.use(json());

        host = x;
        
        console.log(x);
        await config.create()

        io.on('connection', (socket) => {
            console.log("someone connected");
            socket.on('rpc', data => {
                console.log(data);

                apps[data.appID] = data;
                app.get(`/rpc/${data.appID}/data`, function (req, res) {
                    res.send(apps[data.appID])
                })
                app.get(`/rpc/user`, function (req, res) {
                    res.send(rpc.user())
                })

                socketID[socket.id] = {
                    appID: data.appID
                }
                console.log(socketID);

                rpc.run(JSON.stringify(apps))

            });

            socket.on('disconnect', () => {
                rpc.destroy(socketID[socket.id].appID);
            });

        });

        process.on('uncaughtException', (err) => {
            console.log(err)
            if (err === 'EADDRINUSE') {
                console.log("port is currently in use")
                setTimeout(function () { connect() }, 15000)

                return;
            }
        });

        connect()
        function connect() {
            tcpPortUsed.waitUntilFreeOnHost(parseInt(port), 'localhost', 15000, 60000).then(function () {

                http.listen(port, () => {
                    console.log('listening on *:6767');
                });

                fs.readdir(__dirname + "\\..\\host", (err, files) => {

                    files.forEach(file => {

                        var _app = file.replace(".jsx", "");

                        app.get(`/rpc/${_app}/settings`, function (req, res) {
                            res.send(config.load(_app))
                        })

                        app.put(`/rpc/${_app}/settings`, function (req, res) {
                            console.log(req)
                            config.update(_app, req.body)
                            res.send(req.body)
                        })
                    })
                })

                app.get('/', function (req, res) {
                    res.send(`com.discord.rpc.tee ${host}`)
                });

            }).catch(err => {
                if (err.message === "timeout") {
                    connect();
                }
            })
        }

    } catch (err) {
        console.log(err)
    }

}