import React from 'react'
import { Link } from 'gatsby'

export const Menu = () => {

    const pages = [
        {
            title: 'About',
            link: '/about',
            spaceNext: true
        },
        {
            title: 'Recipes',
            link: '/recipes',
            spaceNext: false
        },
        {
            title: 'Culture',
            link: '/culture',
            spaceNext: false
        }, {
            title: 'Blog',
            link: '/blog',
            spaceNext: false
        }
    ]    

    return (
        <ul>
            {pages.map((page, index) => (
                <li key={page.link} className={page.spaceNext ? 'space-next' : ''}>
                    <Link to={page.link} activeClassName="active" partiallyActive={true}>{page.title}</Link>
                </li>
            ))}
        </ul>
    )
}