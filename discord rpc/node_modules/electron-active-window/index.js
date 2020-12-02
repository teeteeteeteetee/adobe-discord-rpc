const activeWindows = require('./build/Release/wm');
const os = require('os');
const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
const mac_d = path.join(__dirname, '/mac/window');
module.exports = () => { 
    if (os.platform() == 'darwin'){
            return{
                getActiveWindow: () => {
                    return new Promise((res, rej) => {
                        if (!fs.existsSync(mac_d)) return rej("Mac binary not found")
                        exec(mac_d, (error, stdout, stderr) => {
                            if (error) return rej(error);
                            const r = stdout || stderr;   
                            var json; try {json = JSON.parse(r);}catch(err){rej(error)}             
                                res({
                                    os: 'macos',
                                    windowClass: json.bundleIdentifier,
                                    windowName: json.name,
                                    windowDesktop: null,
                                    windowType: null,
                                    windowPid: json["PID"],
                                    atTime: json.time,
                                    launchDate: json.launchDate,
                                    isTerminated: json.isTerminated
                                  })
                        });
                    })
                      
                }
            }
    }else{
        return{
            getActiveWindow: () => {
                return new Promise((res, rej) => {
                    const win = activeWindows.getActiveWindow();
                    if (win != null && win.error != null){
                        rej(win.error);
                    }else{
                        res(win);
                    }
                })
            }
        }
    }
}
