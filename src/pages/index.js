import React from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import { Logo, Instagram } from '../components/icons'

const IndexPage = () => {
    const categories = ['Recipes', 'Culture', 'Reviews', 'Blog'];

    return (
        <Layout>
            <SEO title="Home" description="Website coming soon" />
            <section>
                <div className="caption">
                    <Logo />

                    <hr />

                    <h2>Website coming soon...</h2>

                    <p className="bio">Making food look pretty on an old bathroom tile.</p>

                    <ul className="category-list">
                        {categories.map((item, index) =>
                            <li key={`${item}-${index}`} className="category">{item}</li>
                        )}
                    </ul>

                    <ul className="icon-list">
                        <a href="https://www.instagram.com/foodandwriting/" rel="noopener noreferrer" target="_blank">
                            <Instagram />
                        </a>
                    </ul>
                </div>
            </section>


            <section style={{ height: "100%" }}>
                <Image />
            </section>
        </Layout >
    )
}

export default IndexPage
