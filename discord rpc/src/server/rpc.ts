const RPC = require('discord-rpc');

export class RPCClient {

    public appID: string = "";
    public details: string = "";
    public state: string = "";
    public smallImageKey: string = "";
    public smallImageText: string = "";
    public largeImageKey: string = "logo";
    public largeImageText: string = "";
    public timestamp: number = 0;
    public partyMin: number = 0;
    public partyMax: number = 0;

    create() {
        const rpc = new RPC.Client({
            transport: "ipc"
        })

        rpc.on("ready", () => {
            rpc.setActivity({
                state: "yeah",
                largeImageKey: "logo",
                details: "yeah", 
            })
        });

        rpc.login({
            clientId: "748568089939148832"
        })
        
    }

    break(){
        
    }

}