/**
 * @author Tomer Riko Shalev
 * @modified by Tee
 */

import React from 'react';

/**
 * simple wrapper component that supports visibility
 */
export default class Hideable extends React.Component {
    constructor(props) {
        super(props)
    }

    invisibleStyle = {
        display: 'none'
    }

    visibleStyle = {
        display: 'block'
    }

    visStyle(on) {
        return on ? this.visibleStyle : this.invisibleStyle
    }

    render() {
        const { visible, invisible, style, className} = this.props
        const resolved = visible ? true : false

        var mergedStyle = this.visStyle(resolved)

        if(style)
            mergedStyle = Object.assign(style, mergedStyle)

        return (
            <div style={mergedStyle} className={className}>
                {this.props.children}
            </div>
        )

    }

}
