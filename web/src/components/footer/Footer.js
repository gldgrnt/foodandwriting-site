import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { GridContainer, GridRow, GridCol } from '../layout'
import { ReducedLogo } from './components'
import { responsiveBreakpointDown } from '../../utils'


export const Footer = () => {
    const footerLinks = [
        { 'title': 'About', 'link': '/about', 'external': false },
        { 'title': 'Contact', 'link': '/contact', 'external': false },
        { 'title': 'Instagram', 'link': 'https://instagram.com', 'external': true },
        { 'title': 'Cookies', 'link': '/cookies', 'external': false },
    ]

    return (
        <StyledFooter>
            <GridContainer>
                <GridRow align="center">
                    <GridCol cols={{'monitor' : 4, 'mobile': 8}}>
                        <ReducedLogo />
                    </GridCol>

                    <GridCol cols={{'monitor' : 4, 'mobile': 8}}>
                        <LinksWrapper>
                            {footerLinks.map(footerLink => {
                                let attr = footerLink.external 
                                ? {key: footerLink.link, as: "a", href: footerLink.link, rel: "noopener noreferrer", target: "_blank"}
                                : {key: footerLink.link, to: footerLink.link}
                                
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
`

const LinksWrapper = styled.div`
    text-align: right;
`

const FooterLink = styled(Link)`
    font-family: ${props => props.theme.font.family.sans};
    text-transform: uppercase;
    font-weight: 600;
    text-decoration: none;
    font-size: ${props => props.theme.font.size.small};
    color: ${props => props.theme.color.mediumGrey};
    transition: color ${props => props.theme.transition.fast};

    &:hover,
    &:focus {
        color: ${props => props.theme.color.black};
    }

    &:not(:last-child) {
        margin-right: 60px;
    }

    ${responsiveBreakpointDown('mobile', `
        &:not(:last-child) {
            margin-right: 0;
        }
    `)}
`