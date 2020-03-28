import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { GridContainer, Section } from '../layout'
import { SmallCaps, InternalLink } from '../ui'
import { PostArchive } from '../page-sections'

/**
 * RelatedPosts 
 */
export const RelatedPosts = ({ category: {slug, viewAllName, categoryType}, posts }) => {

    return (
        <>
            <GridContainer justify="center">
                <TitleWrapper>
                    <SmallCaps size="small" as="h2">Related Posts</SmallCaps>
                    <Title>More <span>{viewAllName}</span></Title>
                </TitleWrapper>
            </GridContainer>

            <PostArchive posts={posts} onWhite={false} showDate={categoryType === 'Normal'} />

            <GridContainer justify="center">
                <Section as="div" spacingTop="2">
                    <InternalLink to={`/${slug.current}`} secondary>View all {viewAllName}</InternalLink>
                </Section>
            </GridContainer>
        </>
    )
}

/**
 * PropTypes
 */
RelatedPosts.propTypes = {
    category: PropTypes.shape({
        slug: PropTypes.shape({
            current: PropTypes.string.isRequired
        }).isRequired,
        viewAllName: PropTypes.string.isRequired,
    }).isRequired,
    posts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
}


/**
 * Styles
 */
const TitleWrapper = styled.div`
    text-align: center;
    margin-bottom: 30px;
`

const Title = styled.h3`
    font-size: ${props => props.theme.font.size.huge};

    span {
        text-transform: lowercase;
    }
`