/**
 * @author Tee
 */
"use strict";

import { Client } from 'discord-rpc'

export default class RichPresence {

    client;
    clientId;
    active = false;

    constructor(client) {
        this.clientId = client.id;
    }
    login() {
        return new Promise((resolve) => {
            this.client = new Client({ transport: 'ipc' })
            this.client.on('ready', () => {
                console.log(`Rich Presence ready! ${this.client.user.username + "#" + this.client.user.discriminator}`);
                this.active = true;
                this.setActivity({
                    details: undefined,
                    state: undefined
                })
                resolve()
            })

            // handle user disconnect from rpc
            this.client.on('disconnected', () => {
                this.destroy()
                const reconnect = setInterval(() => {
                    this.login()
                        .then(() => {
                            this.active = true;
                            clearInterval(reconnect)
                        })
                        .catch((err) =>{
                            console.error("Couldn't reconnect to Discord! Error: " + err)
                            console.log("Reconnecting in 15 seconds...")
                        })
                }, 15000)
                reconnect
            })

            this.client
                .login({ clientId: this.clientId })
                .catch(console.error)
        })
    }

    async destroy() {
        this.active = false;
        this.client.destroy();
        delete this.client;
    }

    setActivity(props) {
        console.log(props)
        this.client.setActivity({
            details: props.details,
            state: props.state,
            startTimestamp: props.startTimestamp,
            largeImageKey: props.largeImageKey,
            largeImageText: props.largeImageText,
            smallImageKey: props.smallImageKey,
            smallImageText: props.smallImageText,
            partySize: props.partySize,
            partyMax: props.partyMax,
        })
    }

    getUser() {
        return this.client.user;
    }
    getStatus() {
        return this.active;
    }
}
