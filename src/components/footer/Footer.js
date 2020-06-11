import React from 'react'
import styled from 'styled-components'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { FiInstagram } from 'react-icons/fi'
import { AiOutlineTwitter } from 'react-icons/ai'

import { MadeByWadada, CookieBanner } from './components'
import { GridContainer } from '../layout'
import { responsiveBreakpointDown } from '../../utils'


export const Footer = () => {
    const { sanityConfig } = useStaticQuery(graphql`
        query {
            sanityConfig {
                instagramHandle
                twitterHandle
            }
        }
    `)

    return (
        <>
            <CookieBanner />
            <footer>
                <FooterUpper>
                    <GridContainer whiteGrey justify="space-between" wrap="wrap">
                        <LinksWrapper smallSpacing>
                            <SocialLink href={`https://instagram.com/${sanityConfig.instagramHandle}`} target="_blank">
                                <FiInstagram />
                            </SocialLink>

                            <SocialLink href={`https://twitter.com/${sanityConfig.instagramHandle}`} className="twitter" target="_blank">
                                <AiOutlineTwitter />
                            </SocialLink>
                        </LinksWrapper>

                        <LinksWrapper>
                            <PageLink to="/about">About</PageLink>
                            <PageLink to="/contact">Contact</PageLink>
                            <PageLink to="/cookies">Cookies</PageLink>
                        </LinksWrapper>
                    </GridContainer>
                </FooterUpper>
                <FooterLower>
                    <GridContainer justify="flex-end">
                        <MadeByWrapper>
                            <MadeByWadada />
                        </MadeByWrapper>
                    </GridContainer>
                </FooterLower>
            </footer>
        </>
    )
}

const FooterUpper = styled.div`
    padding: 30px 0;
    background: ${props => props.theme.color.whiteGrey};

    ${responsiveBreakpointDown('tablet', `padding: 25px 0;`)}
`

const LinksWrapper = styled.div`
    ${responsiveBreakpointDown('mobile', `
        display: flex;
        justify-content: center;
        flex-basis: 100%;

        &:not(:last-child) {
            margin: 0 0 15px;
        }
    `)}

    >* {
        color: ${props => props.theme.color.darkGrey};
        stroke: ${props => props.theme.color.darkGrey};

        &:not(:last-child) {
            margin-right: ${props => props.smallSpacing ? '40px' : '50px'};
            
            ${responsiveBreakpointDown('mobile', `margin-right: 30px;`)}
        }
        
    }
`

const SocialLink = styled.a`
    svg {
        transform: scale(1.2);
    }

    &.twitter svg {
        transform: scale(1.5);
    }
`


const PageLink = styled(Link)`
    font-family: ${props => props.theme.font.family.sans};
    text-transform: uppercase;
    font-weight: 600;
    text-decoration: none;
    font-size: ${props => props.theme.font.size.small};
    color: ${props => props.theme.color.darkGrey};
`

const FooterLower = styled.div`
    padding: 15px 0 10px;
`

const MadeByWrapper = styled.div`
    opacity: 0.8;
    width: 100%;
    text-align: right;

    ${responsiveBreakpointDown('mobile', `text-align: center;`)}
`