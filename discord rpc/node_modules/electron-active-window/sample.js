/**
 * Executes getActiveWindow every second and prints it the console
 * 
 * Run with `node sample.js`
 */
const activeWindows = require('./index');

setInterval(() => {
  activeWindows().getActiveWindow().then((v)=>{
    console.log(v)
  });
}, 1000);
