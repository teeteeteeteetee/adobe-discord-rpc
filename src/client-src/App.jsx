/**
 * @author Tomer Riko Shalev
 * @modified by Tee
 */

import React from 'react'

import Visualizer from './comps/Visualizer.jsx'
import Debug from './comps/Debug.jsx'
import Config from './comps/Config.jsx'
import Navigator from './comps/Navigator.jsx'
import { FaDiscord } from 'react-icons/fa'

import red from '@material-ui/core/colors/red';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        type:'dark',
        primary: {
            "main": "#36393f"
        },
        secondary: {
            "main": "#292b2f"
        },
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2,

    },
    status: {
        danger: 'orange',
    },
    typography: {
        // In Japanese the characters are usually larger.
        fontSize: 12,
    },

})

const styles = {
    root: {
        width: '100%',
        height: '100vh'
    }
}

/**
 * main app component
 *
 */
export default class App extends React.Component {
    _controller = undefined

    constructor(props) {
        super(props)

        // controller
        this._controller = props.controller
        // navigator data
        this.data = [
            {title: 'Visualizer', icon: <FaDiscord size={22}/>, comp: <Visualizer onExecutePlugin={this.onExecutePlugin}/>},
            {title: 'Config', icon: 'settings', comp: <Config/>},
            {title: 'Debug', icon: 'bug_report', comp: <Debug rawLogz={this.controller.logz}/>}
        ]

    }

    onNavigateChange = (index, title) => {
        console.log(`onNavigateChange:: ${index}, ${title}`)
    }

    /**
     * get controller
     *
     * @return {Controller}
     */
    get controller() {
        return this._controller
    }

    /**
     * execute the plugin
     *
     * @param  {type} options description
     */
    onExecutePlugin = (options) => {
        console.log('App:: onExecutePlugin')
        // here disable UI
        this._controller.invokePlugin(options)
        // here enable ui
    }

    render() {

        return (
            <div style={styles.root}>
                <MuiThemeProvider theme={theme}>
                    <Navigator data={this.data} onNavigateChange={this.onNavigateChange}/>
                </MuiThemeProvider>
            </div>
        )

    }

}
