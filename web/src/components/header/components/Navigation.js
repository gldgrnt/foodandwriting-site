import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'

const Navigation = () => {
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
        <ListWrapper>
            {pages.map(page => {
                return (
                    <ListItem key={page.link}>
                        <Link to={page.link} >{page.title}</Link>
                    </ListItem>
                )
            })}
        </ListWrapper>
    )
}

export { Navigation }

const ListWrapper = styled.ul`
    display: inline-block;
    padding: 0;
    margin: 0;
    list-style-type: none;
`

const ListItem = styled.li`
    display: inline-block;
    padding: 0 45px;
    margin: 0;
`