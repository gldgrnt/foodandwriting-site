import React from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import logo from '../images/faw_logo.svg'
import instagramLogo from '../images/instagram.svg'

const IndexPage = () => {
    const categories = ['Recipes', 'Culture', 'Reviews', 'Blog'];
    const images = [{ title: 'instagram', src: instagramLogo, link: 'https://www.instagram.com/foodandwriting/' }];

    return (
        <Layout>
            <SEO title="Home" description="Website coming soon" />
            <section>
                <div className="caption">
                    <img className="logo" src={logo} alt="Food and Writing logo" />

                    <hr />

                    <h2>Website coming soon...</h2>

                    <p className="bio">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae.</p>

                    <ul className="category-list">
                        {categories.map((item, index) =>
                            <li key={`${item}-${index}`} className="category">{item}</li>
                        )}
                    </ul>

                    <ul className="icon-list">
                        {images.map(item =>
                            <a key={`${item.title}`} href={item.link} rel="noopener noreferrer" target="_blank">
                                <img className={`icon ${item.title}`} src={item.src} alt={`${item.title} logo`} />
                            </a>
                        )}
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
