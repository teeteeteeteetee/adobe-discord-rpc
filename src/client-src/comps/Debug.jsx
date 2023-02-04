/**
 * @author Tomer Riko Shalev
 * @modified by Tee
 */

import React from 'react'
import { Hook, Console, Decode } from 'console-feed'

const styles = {
    root: {
        width: '100%',
        height: '100%',
    }
}

/**
 * display chrome debugger tools console
 */
export default class Debug extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
      logs: []
    }

    componentDidMount() {
        // iniitial logz
        const { rawLogz } = this.props

        // also listen
        Hook(window.console, (log) => {
            this.setState((state) => {
                var logz = state.logs.slice()
                logz.push(Decode(log))
                return {
                    logs: logz
                }

            })

        })

        // replay initial logs
        console.log(...rawLogz)
    }

    render() {

        return (
            <div style={styles.root}>
                <Console logs={this.state.logs} variant="dark" />
            </div>
        )

    }

}
