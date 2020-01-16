import React, { useState } from "react"
import styled from 'styled-components'

import { Navigation, Logo, SearchIcon } from './components'

export const Header = () => {
    const [searchOpen, setSearchOpen] = useState(false);

    // To add:
    /// Header to control dropdowns w/ click elsewhere to close

    return (
        <div>
            <Container>
                <ItemWrapper>
                    <Logo />
                </ItemWrapper>

                <ItemWrapper stretch>
                    <StyledNavigation />
                </ItemWrapper>

                <IconsWrapper onClickCapture={() => setSearchOpen(!searchOpen)}>
                    <SearchIcon />

                </IconsWrapper>
            </Container >
            {searchOpen && 'Search open'}
        </div>
    )
}

const Container = styled.div`
    max-width: 1200px;
    margin: auto;
    display: flex;
    align-items: stretch;
`

const ItemWrapper = styled.div`
    padding: 35px 0;
    flex-grow: ${props => props.stretch ? "1" : "0"};
`

const IconsWrapper = styled.div`
    padding-left: 60px;

    > * {
        height: 100%;
    }
`

const StyledNavigation = styled(Navigation)`
    width: 100%;
    text-align: right;
`
