import React from 'react'
import { Link } from 'gatsby'
import AniLink from 'gatsby-plugin-transition-link/AniLink'

export const Menu = () => {

    const pages = [
        {
            title: 'Recipes',
            link: '/recipes',
            class: false
        },
        {
            title: 'Culture',
            link: '/culture',
            class: false
        }, {
            title: 'Blog',
            link: '/blog',
            class: false
        },
        {
            title: 'About',
            link: '/about',
            class: "about-link"
        },
    ]

    return (
        <ul>
            {pages.map((page, index) => (
                <li key={page.link} className={page.class || ''}>
                    <AniLink cover to={page.link} activeClassName="active" partiallyActive={true}>{page.title}</AniLink>
                </li>
            ))}
        </ul>
    )
}