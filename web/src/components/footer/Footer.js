import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { FaInstagram } from 'react-icons/fa'

import { GridContainer, GridRow, GridCol } from '../layout'
import { ReducedLogo } from './components'


export const Footer = () => {
    const categories = [
        // { 'title': 'Recipes', 'link': '/recipes' },
        // { 'title': 'Culture', 'link': '/culture' },
        { 'title': 'Instagram', 'link': '/blogs' },
    ]

    const footerLinks = [
        { 'title': 'About', 'link': '/about', 'external': false },
        { 'title': 'Contact', 'link': '/contact', 'external': false },
    ]

    return (
        <StyledFooter>
            <GridContainer wrap="wrap">
                <UpperWrapper>
                    <GridRow align="center">
                        <GridCol cols="2">
                            <ReducedLogo />
                        </GridCol>

                        <GridCol cols="4">
                            <p style={{ 'margin': 0, 'textAlign': 'center' }}><em>Making food look pretty on an old bathroom tile.</em></p>
                        </GridCol>

                        <GridCol cols="2">
                            <NavigationWrapper>
                                {categories.map(category => {
                                    return (
                                        <span key={category.link}>
                                            <StyledLink to={category.link}>{category.title}</StyledLink>
                                        </span>
                                    )
                                })}
                            </NavigationWrapper>
                        </GridCol>
                    </GridRow>
                </UpperWrapper>

                <GridRow>
                    <GridCol>
                        {footerLinks.map(footerLink => {
                            return (
                                <span key={footerLink.link}>
                                    <StyledLink to={footerLink.link}>{footerLink.title}</StyledLink>
                                </span>
                            )
                        })}
                    </GridCol>
                </GridRow>
            </GridContainer>
        </StyledFooter>
    )
}

const StyledFooter = styled.footer`
    padding: 60px 0;
    background: ${props => props.theme.color.whiteGrey};
`

const UpperWrapper = styled.div`
    padding-bottom: 40px;
    margin-bottom: 40px;
    width: 100%;
    border-bottom: 1px solid #e6e6e6;
`

const NavigationWrapper = styled.div`
    text-align: right;
`

const StyledLink = styled(Link)`
    font-family: ${props => props.theme.font.family.sans};
    text-transform: uppercase;
    font-weight: 600;
    text-decoration: none;
    padding: 7px 20px;
    font-size: ${props => props.theme.font.size.small};
    color: ${props => props.theme.color.mediumGrey};
    transition: color ${props => props.theme.transition.fast};
    `