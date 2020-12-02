const exec = require('child_process').exec;
const path = require('path');
const file_d = path.join(__dirname, '/mac/window');
const os = require('os');

if (os.platform() == 'darwin'){
    exec("chmod +x " + file_d, (error, stdout, stderr) => {
        if (error) return process.exit(2);
        process.exit(0);
    });
} else {
    process.exit(0);
}