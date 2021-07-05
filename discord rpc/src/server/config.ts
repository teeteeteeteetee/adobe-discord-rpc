import { access } from 'fs/promises';
import { readFile, writeFile, mkdirSync, unlinkSync, existsSync, constants, readdir } from 'fs';

let config_dir = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share") + "adobe-discord-rpc/";

let structure = {
    "details": true,
    "state": true,
    "timestamp": true,
    "enabled": true
};
let data : any;

export class Config {

    static async load() {

        //check if user has permissions
        try {
            await access(config_dir, constants.R_OK | constants.W_OK);
            console.log('can access');
        } catch {
            console.error('cannot access');
        }

        try{

            if(!existsSync(config_dir)){
                // Creates configuration folder if it doesn't exist
                mkdirSync(config_dir);
            }
    
            if (!existsSync(config_dir + "\\config.json")) {
                readdir(__dirname + "\\..\\host", (err, files) => {
                    files.forEach(file => {
                        data[file.replace(".jsx", "")] = structure;
                    })
        
                    writeFile(config_dir + "\\config.json", JSON.stringify(data), (err) => {
                        if(err) throw err;
                    })
                })
            
            }
        }catch{

        }

        readdir(__dirname + "\\..\\host", (err, files) => {

            try{
                var data = require(config_dir + "\\config.json")

                for (const key in data) {
                    if(!files.includes(`${key}.jsx`)){
                        delete data[key];
                    } 
                }
        
                files.forEach(file => {
        
                    if(!data.hasOwnProperty(file.replace(".jsx", ""))){
                        data[file.replace(".jsx", "")] = structure;
                    }
        
                    writeFile(config_dir + "\\config.json", JSON.stringify(data), (err) => {
                        if (err) throw err;
                
                    })
        
                })

            }catch(err : any){

                    if(err.message.includes("Unexpected end of JSON input")){
                        unlinkSync(config_dir + "\\config.json")
                        this.load();
                    }
                }
        })
    }

    static get(APP_ID: string) {

    }

    static update(){

    }

}