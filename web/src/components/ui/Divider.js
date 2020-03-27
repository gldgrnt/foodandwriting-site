import React from 'react'
import styled from 'styled-components'

export const Divider = ({ maxWidth = '100%' }) => {

    return (
        <StyledDiv maxWidth={maxWidth} />
    )
}

const StyledDiv = styled.div`
    height: 1px;
    background: ${props => props.theme.color.lightGrey};
    width: 100%;
    max-width: ${props => props.maxWidth};
    margin: 50px auto 80px;
    opacity: 0.3;
`