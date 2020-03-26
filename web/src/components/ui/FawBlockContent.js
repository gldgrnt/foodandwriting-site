import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import styled from 'styled-components'
import Proptypes from 'prop-types'
import Img from 'gatsby-image/withIEPolyfill'
import { Link } from 'gatsby'
import { GoLinkExternal } from 'react-icons/go'

import { getFluidPropsFromId, getPostSlug } from '../../utils'

/**
 * BlockContent component
 */
export const FawBlockContent = ({ content }) => {

    // Serializers
    const serializers = {
        types: {
            flexImages: props => {
                const {caption, images} = props.node
                
                return (
                    <FlexImagesWrapper>
                        <ImagesWrapper count={images.length} spacing={30}>
                            {images.map(image => (
                                <Img key={image._key} fluid={getFluidPropsFromId(image.asset.id)} alt={image.alt} loading="lazy" />
                            ))} 
                        </ImagesWrapper>
                        <FlexImagesCaption count={images.length}>{caption}</FlexImagesCaption>
                    </FlexImagesWrapper>
                )
            },
        },
        marks: {
            internalLink: ({ children, mark: { link } }) => {
                let linkTo = ''
                // Create link
                switch (link._type) {
                    case 'post':
                        linkTo = getPostSlug(link)
                        break;

                    case 'category':
                        linkTo = `/${link.slug.current}`
                        break;

                    case 'about':
                        linkTo = '/about'
                        break;

                    default:
                        return;
                }

                return (
                    <StyledLink to={linkTo}>{children}</StyledLink>
                )
            },
            externalLink: ({children, mark: { href }}) => {
                return (
                    <ExternalLink>
                        <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
                        <GoLinkExternal/>
                    </ExternalLink>
                )
            }
        }
    }

    return (
        <BlockContent blocks={content} serializers={serializers} />
    )
}

/**
 * PropTypes
 */
FawBlockContent.propTypes = {
    content: Proptypes.array.isRequired
}

/**
 * Styles
 */

// Flex Images
const FlexImagesWrapper = styled.div`
    max-width: none !important;
    padding: 70px 0 60px;
    width: 100%;
`

const ImagesWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    > * {
        width: 100%;
        margin: ${props => props.count === 1 ? 'auto' : ''};
        max-width: ${props => props.count === 1 ? '100%' :`calc((100% / ${props.count}) - ((${props.spacing}px * ${props.count}) - ${props.spacing}px ))`};
    }

    img  {
        object-fit: cover;
    }
`

const FlexImagesCaption = styled.p`
    font-style: italic;
    text-align: ${props => props.count === 1 ? 'center' : 'left'};
    font-size: ${props => props.theme.font.size.regular};
    color: ${props => props.theme.color.darkGrey};
`

// Internal link
const StyledLink = styled(Link)`
    position: relative;

    &,
    &:hover,
    &:focus {
        text-decoration: none;
    }

    &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        display: block;
        width: 100%;
        height: 1px;
        background-color: ${props => props.theme.color.lightGrey};
        transition: background-color ${props => props.theme.transition.fast};
    }

    &:hover,
    &:focus {
        &::after {
            background-color: ${props => props.theme.color.black};
        }
    }
`

// External link
const ExternalLink = styled.span`
    display: inline-flex;
    align-items: flex-start;

    a,
    a:hover,
    a:focus {
        position: relative;
        text-decoration: none;
    }

    a::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 5px;
        display: block;
        width: 100%;
        height: 1px;
        background-color: ${props => props.theme.color.lightGrey};
        transition: background-color ${props => props.theme.transition.fast};
    }

    a:hover,
    a:focus {
        &::after {
            background-color: ${props => props.theme.color.black};
        }
    }
    
    svg {
        height: 0.7em;
        margin-top: 0.3em;
    }
`