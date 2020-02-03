import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { GridContainer, GridRow, GridCol } from '../layout'
import { SmallCaps } from '../ui'
import { VerticalFeaturedPost } from './components'

export const FeaturedTopic = ({ topic, posts }) => {

    return (
        <StyledGridContainer wrap="wrap">
            <GridRow justify="center">
                <GridCol cols="4">
                    <HeaderWrapper>
                        <SmallCaps as="p" size="small">Featured</SmallCaps>
                        <h2>{topic.title}</h2>
                        <p>{topic.description}</p>
                    </HeaderWrapper>
                </GridCol>
            </GridRow>

            <GridRow justify="center">
                <GridCol cols="7">
                    <PostWrapper>
                        {posts.map((post, index) => {
                            return <VerticalFeaturedPost key={index} post={post}></VerticalFeaturedPost>
                        })}
                    </PostWrapper>
                </GridCol>
            </GridRow>
        </StyledGridContainer>
    )
}

FeaturedTopic.propTypes = {
    topic: PropTypes.object.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired
}

const StyledGridContainer = styled(GridContainer)`
    text-align: center;
`

const HeaderWrapper = styled.div`
    margin-bottom: 50px;

    > *:last-child{
        margin: 0;
    }
`

const PostWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
`