import React from 'react'
import styled from 'styled-components'
import { Link, useStaticQuery, graphql } from 'gatsby'

import { GridContainer, GridRow, GridCol } from '../layout'
import { ReducedLogo } from './components'
import { responsiveBreakpointDown } from '../../utils'
import { FiInstagram } from 'react-icons/fi'


export const Footer = () => {
    const { sanityConfig } = useStaticQuery(graphql`
        query {
            sanityConfig {
                instagramHandle
            }
        }
    `)

    const footerLinks = [
        { 'title': <FiInstagram />, 'link': `https://instagram.com/${sanityConfig.instagramHandle}/`, 'external': true },
        { 'title': 'About', 'link': '/about', 'external': false },
        { 'title': 'Cookies', 'link': '/', 'external': false },
    ]

    return (
        <StyledFooter>
            <GridContainer>
                <GridRow align="center">
                    <GridCol cols="4">
                        <ReducedLogo />
                    </GridCol>

                    <GridCol cols="4">
                        <LinksWrapper>
                            {footerLinks.map(footerLink => {
                                let attr = footerLink.external
                                    ? { key: footerLink.link, as: "a", href: footerLink.link, rel: "noopener noreferrer", target: "_blank" }
                                    : { key: footerLink.link, to: footerLink.link }

                                return <FooterLink {...attr}>{footerLink.title}</FooterLink>
                            })}
                        </LinksWrapper>
                    </GridCol>
                </GridRow>
            </GridContainer>
        </StyledFooter>
    )
}

const StyledFooter = styled.footer`
    padding: 40px 0;
    background: ${props => props.theme.color.whiteGrey};

    ${responsiveBreakpointDown('tablet', `padding: 30px 0;`)}
`

const LinksWrapper = styled.div`
    text-align: right;

    ${responsiveBreakpointDown('tablet', `
        text-align: left;
        display: flex;
        justify-content: space-between;
    `)}
`

const FooterLink = styled(Link)`
    font-family: ${props => props.theme.font.family.sans};
    text-transform: uppercase;
    font-weight: 600;
    text-decoration: none;
    font-size: ${props => props.theme.font.size.small};
    color: ${props => props.theme.color.mediumGrey};
    transition: color ${props => props.theme.transition.fast};

    svg {
        stroke-width: 2px;
        transform: scale(1.2) translateY(1px);
    }

    &:hover,
    &:focus {
        color: ${props => props.theme.color.black};
    }

    &:not(:last-child) {
        margin-right: 60px;
    }

    ${responsiveBreakpointDown('tablet', `
        &:not(:last-child) {
            margin-right: 0;
        }
    `)}
`