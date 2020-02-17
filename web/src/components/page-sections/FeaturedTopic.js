import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { GridContainer, GridRow, GridCol } from '../layout'
import { SmallCaps } from '../ui'
import { VerticalFeaturedPost } from './components'
import { responsiveBreakpointDown } from '../../utils'

export const FeaturedTopic = ({ title, subtitle, posts }) => {

    return (
        <StyledGridContainer wrap="wrap">
            <GridRow justify="center">
                <GridCol cols={{ 'monitor': 4, 'desktop': 6, 'tablet': 8 }}>
                    <HeaderWrapper>
                        <SmallCaps as="p" size="small">{subtitle}</SmallCaps>
                        <h2>{title}</h2>
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
        </StyledGridContainer>
    )
}

FeaturedTopic.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired
}

const StyledGridContainer = styled(GridContainer)`
    text-align: center;
`

const HeaderWrapper = styled.div`
    margin-bottom: 50px;

    ${responsiveBreakpointDown('mobile', `margin-bottom: 30px;`)}

    > *:first-child {
        ${responsiveBreakpointDown('tablet', `margin-bottom: 10px;`)}
    }
        
    > *:last-child{
        margin: 0;
    }
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