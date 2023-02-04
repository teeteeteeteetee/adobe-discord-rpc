/**
 * @author Tee
 */

import { Client, register } from 'discord-rpc'
export default class RichPresence {

    client;
    clientId;

    constructor(client){
        this.clientId = client.id;
    }

    async create(){
        this.client = new Client({ transport: 'ipc'})
        this.client.on('ready', () => {
            this.setActivity({
                details: "hi",
                state: "hello",
                largeImageKey: "logo",
                largeImageText: "test123",
            })
        })
    }

    async login(){
        await this.client
        .login({ clientId: this.clientId })
        .catch(console.error)
    }

    async destroy(){
        await this.client.destroy();
        delete this.client;
    }

    setActivity(props){
        this.client.setActivity({
            details: props.details,
            state: props.state,
            startTimestamp: props.startTimestamp,
            largeImageKey: props.largeImageKey,
            largeImageText: props.largeImageText,
            smallImageKey: props.smallImageKey,
            smallImageText: props.smallImageText,
        })
    }

    getUser(){
        return this.client.user;
    }
}
