import * as apps from './apps.json';
const RPC = require("discord-rpc");

export class RPCClient {

    private rpc = new RPC.Client({
        transport: "ipc"
    })
    private clientID: any;
    private apps: any = apps;

    public details: any = undefined;
    public state: any = undefined;
    public smallImageKey: string = "";
    public smallImageText: string = "";
    public largeImageKey: string = "logo";
    public largeImageText: string = "";
    public timestamp: number = 0;
    public partyMin: number = 0;
    public partyMax: number = 0;

    constructor(appID: any){
        this.clientID = this.apps[appID];
    }

    create() {
        this.rpc.on("ready", () => {
            this.update();
        });

        this.rpc.login({
            clientId: this.clientID
        });
        
    }

    update(){
        this.rpc.setActivity({
            details: this.details,
            state: this.state,
            smallImageKey: this.smallImageKey,
            smallImageText: this.smallImageText,
            largeImageKey: "logo",
            largeImageText: this.largeImageText,
            startTimestamp: this.timestamp,
            partySize: this.partyMin,
            partyMax: this.partyMax
        })
    }

    destroy(){
        this.rpc.destroy();
    }

}