import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

export const Menu = ({ reduced = false }) => {

    const pages = [
        {
            title: 'Recipes',
            link: '/recipes',
            reducedMenuItem: true
        },
        {
            title: 'Culture',
            link: '/culture',
            reducedMenuItem: true
        }, {
            title: 'Blog',
            link: '/blog',
            reducedMenuItem: true
        },
        {
            title: 'About',
            link: '/about',
            reducedMenuItem: false
        }
    ]    

    return (
        <ul>
            {pages.map((page, index) => {
                if (page.reducedMenuItem || (!reduced && !page.reducedMenuItem)) {
                    
                    return (
                        <>
                            <li key={page.link} fullMenuItem={!page.reducedMenuItem && ""}>
                                <Link to={page.link} activeClassName="active" partiallyActive={true}>{page.title}</Link>
                            </li>
                        </>
                    )} 

                    return false
                }
            )}
        </ul>
    )
}

Menu.propTypes = {
    fullMenu: PropTypes.bool
}