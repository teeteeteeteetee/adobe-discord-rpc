/**
 * @author Tomer Riko Shalev
 * @modified by Tee
 */

import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Icon from '@material-ui/core/Icon'
import AppBar from '@material-ui/core/AppBar';
import withStyles from '@material-ui/core/styles/withStyles';

import Hideable from './Hideable.jsx'

const styles = theme => ({
    root: {
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: theme.palette.background.paper
    },
    contentContainer: {
        height: '100%',
        overflow: 'scroll',
        overflowX: 'hidden'
    }
})

/**
 * react component for creating a material-ui tab navigator.
 * configurable with data.
 */
class Navigator extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        activeTabIndex: 0,
    }

    handleChange = (event, value) => {
        this.setState({ activeTabIndex: value })

        // notidy observer
        const {data, onNavigateChange} = this.props

        if(onNavigateChange)
            onNavigateChange(value, data[value].title)
    }

    /**
     * tabFactory - create a tab item
     *
     * @param  {type} data description
     * @return {type}      description
     */
    tabFactory(data, index) {
        var title = data.title.toUpperCase()
        var icon = data.icon

        if(React.isValidElement(icon)){
            console.log(icon + ' is element')
            return <Tab key={index} label={title}>
                
            </Tab>
        }

        return <Tab key={index} icon={<Icon>{icon}</Icon>} label={title}/>



    }

    /**
     * tabFactory - create a tab content container
     *{data.comp}
     * @param  {type} data description
     * @return {type}      description
     */
    tabContentFactory(data, index, active, classes) {
        var title = data.title.toLowerCase()
        var comp = data.comp

        return (
            <Hideable key={index} visible={active}>{comp}</Hideable>
        )
    }

    render() {
        const { data , classes} = this.props
        const { activeTabIndex } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs fullWidth
                        value={activeTabIndex}
                        onChange={this.handleChange}
                        >

                        {data.map((item,i) => this.tabFactory(item, i))}
                    </Tabs>
                </AppBar>
                <div className={classes.contentContainer}>
                    {data.map((item,i) => this.tabContentFactory(item, i, activeTabIndex===i, classes))}
                </div>
            </div>
        )

    }

}

export default withStyles(styles)(Navigator);
