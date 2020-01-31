import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { GridContainer } from '../layout'
import { SmallCaps } from '../ui'

export const HorizontalPostSection = ({ category, posts }) => {


    return (
        <StyledSection>
            <GridContainer>
                <SmallCaps as="h2" size="increase" color="black">{category.title}</SmallCaps>
            </GridContainer>
        </StyledSection>
    )
}

HorizontalPostSection.prototypes = {
    category: PropTypes.object,
    posts: PropTypes.array
}

const StyledSection = styled.section`
    
`