import React from 'react'
import styled from 'styled-components'
import Proptypes from 'prop-types'

import { GridContainer } from '../layout'
import { SmallCaps, FawBlockContent } from '../ui'
import { getPostDate } from '../../utils'

/**
 * DefaultPostContent component
 */
export const DefaultPostContent = ({ content, date }) => {

    const postDate = getPostDate(date, 'Do MMMM YYYY')

    return (
        <GridContainer>
            <ContentWrapper>
                <Date aria-label={`Posted on ${postDate.formatted}`}>
                    <SmallCaps color="mediumGrey" size="small">Date</SmallCaps>
                    <time dateTime={postDate.raw}>{postDate.formatted}</time>
                </Date>
                <FawBlockContent content={content}/>
            </ContentWrapper>
        </GridContainer>
    )
}

/**
 * PropTypes
 */
DefaultPostContent.propTypes = {
    date: Proptypes.string.isRequired,
    content: Proptypes.array.isRequired
}

/**
 * Styles
 */
const ContentWrapper = styled.article`
    width: 100%;
    max-width: 1200px;
    margin: auto;
    font-size: ${props => props.theme.font.size.increased};

    > div {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        >  p {
            width: 100%;
            max-width: 750px;
        }
    }
`

const Date = styled.time`
    display: block;
    max-width: 750px;
    margin: 0 auto 60px;

    > * {
        display: block;

        &:first-child {
            margin-bottom: 10px;
        }
    }
`