import React from 'react'
import styled from 'styled-components'

export const Divider = () => {

    return (
        <StyledDiv />
    )
}

const StyledDiv = styled.div`
    margin: 50px 0 80px;
    height: 1px;
    background: ${props => props.theme.color.lightGrey};
    opacity: 0.3;
`