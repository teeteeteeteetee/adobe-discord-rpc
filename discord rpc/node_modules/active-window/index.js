var fs = require('fs');
var config = getConfig();

/**
 * This callback handle the response request by getActiveWindow function
 * @callback getActiveWindowCallback
 * @param {app: string, window: string} window
 */

/**
* Get the active window
* @param {getActiveWindowCallback} callback - The callback that handles the response.
* @param {integer} [repeats  = 1] - Number of repeats; Use -1 to infinity repeats
* @param {float}   [interval = 0] - Loop interval in seconds. For milliseconds use fraction (0.1 = 100ms)
*/
exports.getActiveWindow = function(callback,repeats,interval){
  const spawn = require('child_process').spawn;

  interval = (interval) ?  interval : 0;
  repeats = (repeats) ? repeats : 1;

  //Scape negative number of repeats on Windows OS
  if (process.platform == 'win32' && repeats < 0 ){
    repeats = '\\-1';
  }

  parameters  = config.parameters;
  parameters.push(repeats);
  parameters.push(interval);

  //Run shell script
  const ls  = spawn(config.bin,parameters);
  ls.stdout.setEncoding('utf8');

  //Obtain successful response from script
  ls.stdout.on('data', function(stdout){
    callback(reponseTreatment(stdout.toString()));
  });

  //Obtain error response from script
  ls.stderr.on("data",function(stderr){
   throw stderr.toString();
  });

  ls.stdin.end();
}

/**
* Treat and format the response string and put it into a object
* @function reponseTreatment
* @param {string} String received from script
*/
function reponseTreatment(response){
  window = {};
  if(process.platform == 'linux'){
    response = response.replace(/(WM_CLASS|WM_NAME)(\(\w+\)\s=\s)/g,'').split("\n",2);
    window.app = response[0];
    window.title = response[1];
  }else if (process.platform == 'win32'){
    response = response.replace(/(@{ProcessName=| AppTitle=)/g,'').slice(0,-1).split(';',2);
    window.app = response[0];
    window.title = response[1];
  }else if(process.platform == 'darwin'){
    response = response.split(",");
    window.app = response[0];
    window.title = response[1].replace(/\n$/, "").replace(/^\s/, "");
  }
  return window;
}

/**
* Get script config accordingly the operating system
* @function getConfig
*/
function getConfig(){
  //Retrieve configs
  var configs = JSON.parse(fs.readFileSync(__dirname+'/configs.json', 'utf8'));
  var path = require("path");

  switch(process.platform){
      case 'linux':
      case 'linux2':
          config = configs.linux
          break;
      case 'win32':
          config = configs.win32
          break;
      case 'darwin':
          config = configs.mac;
          break;
      default:
          throw "Operating System not supported yet. "+process.platform;
  }
  //Append directory to script url
  script_url = path.join(__dirname,config.script_url);
  config.parameters.push(script_url);

  //Append directory to subscript url on OSX
  if(process.platform=="darwin"){
    config.parameters.push(path.join(__dirname,config.subscript_url));
  }

  return config;
}
