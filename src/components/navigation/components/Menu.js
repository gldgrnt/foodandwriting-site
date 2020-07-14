import React from "react"
import { Link } from "gatsby"

export const Menu = ({ reduced = false }) => {
    const pages = [
        {
            title: "Recipes",
            link: "/recipes",
            class: false,
            showInReduced: true
        },
        {
            title: "Culture",
            link: "/culture",
            class: false,
            showInReduced: true
        },
        {
            title: "Blog",
            link: "/blog",
            class: false,
            showInReduced: true
        },
        {
            title: "About",
            link: "/about",
            class: "about-link",
            showInReduced: true
        },
        {
            title: "Contact",
            link: "/contact",
            class: false,
            showInReduced: false
        }
    ]

    const menuPages = pages.filter(page => !reduced || (reduced && page.showInReduced))

    return (
        <ul>
            {menuPages.map((page, index) => (
                <li key={page.link} className={page.class || ""}>
                    <Link
                        to={page.link}
                        activeClassName="active"
                        partiallyActive={true}
                    >
                        {page.title}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
