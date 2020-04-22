import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'

import { useMobileStatus } from '../../../hooks'
import { SmallCaps, Button } from '../../ui'
import { responsiveBreakpointDown } from '../../../utils'

export const RecipeSliderPost = ({ post: {title, fullSlug, featuredImage} }) => {

    // Get mobile state
    const isMobile = useMobileStatus()

    return (
        <LinkWrapper to={fullSlug}>
            <Article>
                <ImageWrapper>
                    <Img fluid={featuredImage.asset.fluid} objectFit="cover" objectPosition="50% 50%" alt={featuredImage.alt || title} />
                </ImageWrapper>

                <CaptionWrapper>
                    <Title>{title}</Title>
                    { !isMobile ?
                        <SmallCaps size="tiny" color="mediumGrey" link>View recipe</SmallCaps>
                        :
                        <Button secondary>View recipe</Button>
                    }
                </CaptionWrapper>
            </Article>
        </LinkWrapper>
    )
}

RecipeSliderPost.prototypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        fullSlug: PropTypes.string.isRequired,
        featuredImage: PropTypes.object.isRequired
    }).isRequired,
}

const LinkWrapper = styled(Link)`
    text-decoration: none;
    outline: none;
    max-width: ${props => (props.theme.grid.breakpoints.monitor.minScreenWidth / 3) - 120}px;

    &:hover,
    &:focus {
        text-decoration: underline;

        span {
            color: ${props => props.theme.color.black};

            &::after {
                background: ${props => props.theme.color.black};
            }
        }
    }

    ${props => responsiveBreakpointDown('desktop', `
        max-width: ${(props.theme.grid.breakpoints.desktop.minScreenWidth / 3) - 60}px;
    `)}

    ${props => responsiveBreakpointDown('laptop', `
        max-width: ${(props.theme.grid.breakpoints.laptop.minScreenWidth / 3) - 60}px;
    `)}

    ${responsiveBreakpointDown('mobile', `
        max-width: none;
        width: calc(100% - 30px);
        margin: auto;
    `)}
`

const Article = styled.article`
    position: relative;
    width: 100%;

    ${props => responsiveBreakpointDown('mobile', `
        height: calc(100vh - 58px);
    `)}
`

const ImageWrapper = styled.div`
    position: relative;
    padding-top: 135%;
    margin-bottom: 20px;
    background: ${props => props.theme.color.whiteGrey};
    
    ${responsiveBreakpointDown('mobile', `height: 100%`)}

    &::after {
        ${props => responsiveBreakpointDown('mobile', `
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            background: ${props.theme.color.blackOverlay};
            z-index: 1;
        `)}
    }

    > * {
        position: absolute !important;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }
`

const CaptionWrapper = styled.div`
    ${responsiveBreakpointDown('mobile', `
        position: absolute;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        padding: 0 30px;
        text-align: center;

        > h3 {
            color: white;
        }
    `)}
`

const Title = styled.h3`
    font-size: ${props => props.theme.font.size.medium};
    margin-bottom: 10px;
    white-space: normal;

    ${props => responsiveBreakpointDown('tablet', `
        font-size: ${props.theme.font.size.regular};
    `)}

    ${props => responsiveBreakpointDown('mobile', `
        font-size: ${props.theme.font.size.giant};
        margin-bottom: 15px;
    `)}
`