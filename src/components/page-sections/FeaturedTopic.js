import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { GridContainer, GridRow, GridCol } from '../layout'
import { SmallCaps } from '../ui'
import { VerticalFeaturedPost } from './components'
import { responsiveBreakpointDown } from '../../utils'

export const FeaturedTopic = ({ title, subtitle, posts }) => {

    return (
        <GridContainer wrap="wrap">
                <GridRow justify="center">
                    <GridCol cols={{ 'monitor': 4, 'desktop': 6, 'tablet': 8 }}>
                        <HeaderWrapper>
                            <SmallCaps as="p" size="small">{subtitle}</SmallCaps>
                            <Title>{title}</Title>
                        </HeaderWrapper>
                    </GridCol>
                </GridRow>

                <GridRow justify="center">
                    <GridCol cols={{ 'monitor': 7, 'desktop': 8 }}>
                        <PostWrapper>
                            {posts.map((post, index) => {
                                return <VerticalFeaturedPost key={index} post={post}></VerticalFeaturedPost>
                            })}
                        </PostWrapper>
                    </GridCol>
                </GridRow>
        </GridContainer>
    )
}

FeaturedTopic.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired
}

const HeaderWrapper = styled.div`
    text-align: center;
    margin-bottom: 50px;

    ${responsiveBreakpointDown('mobile', `margin-bottom: 30px;`)}

    > *:first-child {
        ${responsiveBreakpointDown('tablet', `margin-bottom: 10px;`)}
    }
        
    > *:last-child {
        margin: 0;
    }
`

const Title = styled.h2`
    font-size: ${props => props.theme.font.size.giant};

    ${props => responsiveBreakpointDown('tablet', `
        font-size: ${props.theme.font.size.large};
    `)}
`

const PostWrapper = styled.div`
    display: flex;
    justify-content: space-around;

    ${responsiveBreakpointDown('mobile', `
        flex-wrap: wrap;
        
        > *:not(:last-child) {
            margin-bottom: 40px;
        }
    `)}

`