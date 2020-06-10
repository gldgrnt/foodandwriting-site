import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { GoLinkExternal } from 'react-icons/go'
import _ from 'lodash'

import { getPostSlug } from '../../../utils'

/**
 * LinkMark
 */
export const LinkMark = ({ children, mark }) => {
    switch (mark._type) {
        case 'internalLink':
            return (
                <StyledLink>
                    <Link to={resolveInteralLink(mark.link)}>{children}</Link>
                </StyledLink>
            )

        case 'externalLink':
            return (
                <StyledLink>
                    <a href={mark.href} target="_blank" rel="noopener noreferrer">{children}</a>
                    <GoLinkExternal />
                </StyledLink>
            )

        default:
            return
    }
}

/**
 * ResolveInternalLink
 * 
 * @param {{_type: string, slug?: {current: string}, post?: {slug: { current: string}} }} link Link object
 * @returns {string} Link string for Gatsby Link component
 */
const resolveInteralLink = (link) => {
    if (!_.has(link, '_type')) return '#'

    switch (link._type) {
        case 'post':
            return getPostSlug(link)

        case 'category':
            return `/${link.slug.current}`

        case 'about':
            return '/about'

        default:
            return
    }
}

/**
 * PropTypes
 */
LinkMark.propTypes = {
    children: PropTypes.node.isRequired,
    mark: PropTypes.shape({
        _type: PropTypes.string.isRequired,
        // For internal link
        link: PropTypes.shape({
            _type: PropTypes.string,
            slug: PropTypes.shape({
                current: PropTypes.string
            }),
            category: PropTypes.shape({
                slug: PropTypes.shape({
                    current: PropTypes.string
                })
            })
        }),
        // External link
        href: PropTypes.string
    })
}


/**
 * Styles
 */
const StyledLink = styled.span`
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