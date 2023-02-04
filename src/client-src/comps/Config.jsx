/**
 * @author Tomer Riko Shalev
 * @modified by Tee
 */

import React from 'react'
import Paper from "@material-ui/core/Paper"
import List from "@material-ui/core/List"
import Button from "@material-ui/core/Button"
import withStyles from '@material-ui/core/styles/withStyles'

import PluginItem from './PluginItem.jsx'
import BrowseItem from './BrowseItem.jsx'

const styles = theme => ({
    root: {
        paddingTop:theme.spacing.unit * 1
    },
    paper: {
        display:'flex',
        flexDirection: 'column'
    },
    export: {
        margin: theme.spacing.unit * 3,
        alignSelf: 'flex-end'
    }
})

/**
 * Home tab content
 *
 */
class Config extends React.Component {

    constructor() {
        super()

        this.textureItemRef = React.createRef()
        this.masksItemRef = React.createRef()
        this.infoItemRef = React.createRef()
        this.hierarchicalItemRef = React.createRef()
        this.inspectVisibleItemRef = React.createRef()
        this.browseItemRef = React.createRef()
        this.namesItemRef = React.createRef()
    }

    /**
     * export button was clicked
     *
     */
    export_onClick = (e) => {
        var folderPath = this.browseItemRef.current.path
        var isTexturesChecked = this.textureItemRef.current.isChecked
        var isMasksChecked = this.masksItemRef.current.isChecked
        var isInfoChecked = this.infoItemRef.current.isChecked
        var isHierarchicalChecked = this.hierarchicalItemRef.current.isChecked
        var isInspectVisibleChecked = this.inspectVisibleItemRef.current.isChecked
        var isMeaningfulNamesChecked = this.namesItemRef.current.isChecked

        var { onExecutePlugin } = this.props

        onExecutePlugin({
            folderPath,
            isTexturesChecked,
            isMasksChecked,
            isInfoChecked,
            isMeaningfulNamesChecked,
            isHierarchicalChecked,
            isInspectVisibleChecked
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper elevation={5} className={classes.paper}>
                    <List>
                        <PluginItem ref={this.textureItemRef} index='0' title='Textures'
                                    desc='export textures' icon='texture'/>
                        <PluginItem ref={this.masksItemRef} index='1' title='Masks'
                                    desc='export masks' icon='layers'/>
                        <PluginItem ref={this.infoItemRef} index='2' title='Info'
                                    desc='export info json' icon='info'/>
                        <PluginItem ref={this.hierarchicalItemRef} index='3' title='Hierarchical'
                                    desc='hierarchical display list or flatten' icon='list'/>
                        <PluginItem ref={this.inspectVisibleItemRef} index='4' title='Visibility'
                                    desc='inspect only visible layers' icon='visibility'/>
                        <PluginItem ref={this.namesItemRef} index='5' title='Names'
                                    desc='maningful names for assets' icon='build'/>
                        <BrowseItem innerRef={this.browseItemRef}/>
                    </List>
                    <Button onClick={this.export_onClick}
                            className={classes.export} size="small">
                        Export
                    </Button>
                </Paper>

            </div>
        )

    }

}

export default withStyles(styles)(Config);
