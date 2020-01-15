import React from "react"
import styled from 'styled-components'

import { Navigation, Logo } from './components'

export const Header = () => {

    return (
        <Wrapper>
            <Container>
                <Logo />
                <StyledNavigation />
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled.header`
    padding: 35px 0;
`

const StyledNavigation = styled(Navigation)``

const Container = styled.div`
    max-width: 1200px;
    margin: auto;
    display: flex;
    align-items: center;

    ${StyledNavigation} {
        text-align: right;
        flex-grow: 1;
    }
`
