import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'

class SmallCaps extends Component {
    render() {
        const TagName = this.props.tag
        const tagSize = this.props.size || 'regular'
        const color = this.props.color || 'darkGrey'

        const StyledTagName = styled[TagName]`
            display: block;
            font-family: ${props => props.theme.font.family.sans};
            font-size: ${props => props.theme.font.size[tagSize]};
            font-weight: bold;
            text-transform: uppercase;
            color: ${props => props.theme.color[color]};
        `

        return <StyledTagName>{this.props.children}</StyledTagName>
    }

}

// Export with HOC withTheme to give component acess to theme values
export default withTheme(SmallCaps)

SmallCaps.propTypes = {
    tag: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    size: PropTypes.string,
    color: PropTypes.string
}