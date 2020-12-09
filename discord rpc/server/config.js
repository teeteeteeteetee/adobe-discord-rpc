const fs = require("fs")
var path = (process.env.APPDATA + "\\adobe-discord-rpc")

var form = {
    "details": true,
    "state": true,
    "timestamp": true,
    "enabled": true
}

var data = {};

module.exports.create = function () {

    if (!fs.existsSync(path)) fs.mkdirSync(path)

    if (!fs.existsSync(path + "\\config.json")) {
        fs.readdir(__dirname + "\\..\\host", (err, files) => {
            files.forEach(file => {
                data[file.replace(".jsx", "")] = form
            })

            fs.writeFile(path + "\\config.json", JSON.stringify(data), (err) => {
                if (err) throw err;

            })
        })
    }
}

module.exports.load = function (appID) {
    try {

        var rawdata = require(path + "\\config.json")
        console.log(rawdata)

        if(!appID) return rawdata
        if (!rawdata.hasOwnProperty(appID)) {
            console.log("yes no idk")
            rawdata[appID] = form

            fs.writeFile(path + "\\config.json", JSON.stringify(rawdata), (err) => {
                if (err) throw err;

            })
        }

        return rawdata[appID]

    } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
            this.create()
        }
        console.log("ok")
        throw err;
    }
}

