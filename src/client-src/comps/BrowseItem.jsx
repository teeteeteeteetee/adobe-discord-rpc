/**
 * @author Tomer Riko Shalev
 * @modified by Tee
 */

import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl'
import withStyles from '@material-ui/core/styles/withStyles'
import purple from '@material-ui/core/colors/purple'

import ListItem from "@material-ui/core/ListItem"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    // cssLabel: {
    //     '&$cssFocused': {
    //         color: purple[500],
    //     },
    // },
    // cssFocused: {},
    // cssUnderline: {
    //     '&:after': {
    //         borderBottomColor: purple[500],
    //     },
    // },
    folder: {
        marginRight: theme.spacing.unit * 3.5
    }
})

/**
 * general browse item
 *
 */
class BrowseItem extends React.Component {

    constructor(props) {
        super(props)

        this.lblRef = React.createRef()
    }

    /**
     * onClick - clicking the input
     *
     */
    onClick = (e) => {
        this.lblRef.current.focus()
        var path = this.lblRef.current.value

        // test if we are inside the adobe-cep runtime
        if(window.cep) {
            var result = window.cep.fs.showOpenDialog(false,
                        true, 'Select a Folder', null, null)

            path = result.data
        }

     	this.lblRef.current.value = path
    }

    /**
     * return path or undefined if it was not set
     *
     * @return {string|undefined} the path
     */
    get path() {
        return this.lblRef.current.value
    }

    render() {
        const {classes} = this.props;

        return (
            <ListItem style={{width:'85%'}}
                role={undefined}
                className={undefined}>

                <FormControl fullWidth className={classes.margin}>
                    <InputLabel id='tomer' margin='dense'
                        FormLabelClasses={{ root: classes.cssLabel,
                                            focused: classes.cssFocused}}
                        htmlFor="custom-css-input">
                        Choose Folder...
                    </InputLabel>
                    <Input inputRef={this.lblRef}
                        classes={{underline: classes.cssUnderline}}
                        id="custom-css-input"/>
                </FormControl>

                <ListItemSecondaryAction className={classes.folder}>
                    <IconButton>
                        <Icon color="primary" onClick={this.onClick}>folder_open</Icon>
                    </IconButton>
                </ListItemSecondaryAction>

            </ListItem>

        )

    }

}

export default withStyles(styles)(BrowseItem);
