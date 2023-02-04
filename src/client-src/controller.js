/**
 * @author Tomer Riko Shalev
 * @modified by Tee
 */

/**
 * the main plugin session. This can enter the node modules as
 * well as the host
 *
 */
class Controller {

    constructor() {
        //super()

        this.init()
    }

    /**
     * init - session
     *
     */
    init() {
        this.log('client controller is initing...')
        this.log(`do we have session ? ${this.hasSession()}`)

        this.log('client controller has inited')
    }

    /**
     * invoke the plugin
     *
     * @param  {{textures:boolean, masks:boolean, info: boolean, flatten:boolean}} options for plugin
     *
     * @return {object} describes how well the execution of plugin was
     */
    invokePlugin(options) {
        this.log('invokePlugin')
        console.log(options)

        if(!this.hasSession())
            return

        session.invokePlugin(options)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    /**
     * get logz - get raw logz from log manager
     *
     * @return {array<Object>}  description
     */
    get logz() {
        if(!this.hasSession())
            return []

        return session.managers.log.rawLogs
    }

    /**
     * do we have access to session services ?
     *
     * @return {boolean} true/false
     */
    hasSession() {
        return window.session!==undefined
    }

    /**
     * log some info with session prefix
     *
     * @param  {string} val what to log
     */
    log(val) {
        console.log(`${this.name} ${val}`)
    }

    get name() {
        return 'Client Controller:: '
    }

}

var controller = new Controller()

export default controller
