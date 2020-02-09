import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'

export const Navigation = ({ className }) => {
    const pages = [
        {
            'title': 'Recipes',
            'link': '/recipes'
        },
        {
            'title': 'Culture',
            'link': '/culture'
        }, {
            'title': 'Blog',
            'link': '/blog'
        },
    ]

    return (
        <nav>
            <ListWrapper className={className}>
                {pages.map(page => {
                    return (
                        <ListItem key={page.link}>
                            <ListItemLink to={page.link} activeClassName="active" partiallyActive={true}>{page.title}</ListItemLink>
                        </ListItem>
                    )
                })}
            </ListWrapper>
        </nav>
    )
}

const ListWrapper = styled.ul`
    display: inline-block;
    padding: 0;
    margin: 0;
    list-style-type: none;
`

const ListItem = styled.li`
    display: inline-block;
    padding: 0 35px;
    margin: 0;
    font-family: ${props => props.theme.font.family.sans};

    &:first-child {
        padding-left: 0;
    }

    &:last-child {
        padding-right: 0;
    }
`

const ListItemLink = styled(Link)`
    text-transform: uppercase;
    font-weight: 600;
    text-decoration: none;
    padding: 7px 10px;
    font-size: ${props => props.theme.font.size.small};
    color: ${props => props.theme.color.mediumGrey};
    transition: color ${props => props.theme.transition.fast};

    &:hover,
    &:focus {
        color: ${props => props.theme.color.black};
    }

    &.active {
        &, &:hover, &:focus {
            background: ${props => props.theme.color.yellow};
            color: ${props => props.theme.color.black};
        }
    }
`