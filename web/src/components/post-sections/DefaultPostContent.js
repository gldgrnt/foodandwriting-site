import React from 'react'
import styled from 'styled-components'
import Proptypes from 'prop-types'

import { GridContainer } from '../layout'
import { FawBlockContent } from '../ui'

/**
 * DefaultPostContent component
 */
export const DefaultPostContent = ({ content }) => {

    return (
        <GridContainer>
            <ContentWrapper>
                <FawBlockContent content={content}/>
            </ContentWrapper>
        </GridContainer>
    )
}

/**
 * PropTypes
 */
DefaultPostContent.propTypes = {
    content: Proptypes.array.isRequired
}

/**
 * Styles
 */
const ContentWrapper = styled.article`
    width: 100%;
    font-size: ${props => props.theme.font.size.increased};

    > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        > * {
            width: 100%;
            max-width: 750px;
        }
    }
`