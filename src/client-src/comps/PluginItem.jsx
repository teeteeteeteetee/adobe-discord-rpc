/**
 * @author Tomer Riko Shalev
 * @modified by Tee
 */

import React from 'react'
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Icon from '@material-ui/core/Icon';

/**
 * general plugin item that lives inside thw Home content
 *
 */
export default class PluginItem extends React.Component {

    constructor() {
        super()

        this.cbRef = React.createRef()
    }

    state = {
        checked: true
    }

    internal_check(on) {
        this.setState({
            checked: on
        })
    }

    handleToggle = () => {
        const { checked } = this.state

        this.setState({
            checked: !checked
        })

    }

    /**
     * get isChecked
     *
     * @return {type}  description
     */
    get isChecked() {
        return this.state.checked
    }

    set check(val) {
        this.internal_check(val)
    }

    render() {
        const { index, title, desc, icon } = this.props
        const { checked } = this.state

        return (
            <ListItem
                key={index}
                role={undefined}
                dense
                button
                onClick={this.handleToggle}
                className={undefined}>
                <Checkbox
                    checked={checked}
                    tabIndex={-1}
                    disableRipple/>
                <ListItemText primary={title} secondary={desc}/>
                <ListItemSecondaryAction>
                    <Icon color="secondary" style={{paddingRight:'40px'}}>{icon}</Icon>
                </ListItemSecondaryAction>
            </ListItem>
        )

    }

}
