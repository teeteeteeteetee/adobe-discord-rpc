const fs = require("fs")
var path = process.env.APPDATA + "\\adobe-discord-rpc" || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share") + "/adobe-discord-rpc";
var rpc = require("./rpc")

//if it cant get appdata somewhat
if(!process.env.APPDATA){
    path = process.env.HOMEPATH + "\\Documents\\adobe-discord-rpc";
}

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
            console.log(files);
            files.forEach(file => {
                data[file.replace(".jsx", "")] = form
            })

            fs.writeFile(path + "\\config.json", JSON.stringify(data), (err) => {
                if (err) throw err;

            })
        })
    
    }
    fs.readdir(__dirname + "\\..\\host", (err, files) => {

        try{
            var data = require(path+ "\\config.json")

            for (const key in data) {
                if(!files.includes(`${key}.jsx`)){
                    delete data[key]
                } 
            }
    
            files.forEach(file => {
    
                if(!data.hasOwnProperty(file.replace(".jsx", ""))){
                    data[file.replace(".jsx", "")] = form
                }
    
                fs.writeFile(path + "\\config.json", JSON.stringify(data), (err) => {
                    if (err) throw err;
            
                })
    
            })

        }catch(err){

            if(err.message.includes("Unexpected end of JSON input")){
                fs.unlinkSync(path + "\\config.json")

                console.log("recreate")

                this.create()
                return;
            }
        }
    })
    
}

module.exports.update = function (appID, newData) {
    try{
        var data = require(path+ "\\config.json")


        console.log(appID, newData)

        data[appID] = newData

        fs.writeFile(path + "\\config.json", JSON.stringify(data), (err) => {
            if (err) throw err;
    
        })

        console.log("here")
        rpc.forceRun();
        console.log("here")
        

    }catch(err){
        throw err
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

