import React from 'react'
// import styled from 'styled-components'
import PropTypes from 'prop-types'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

export const PostSlider = (posts) => {

    const photoURL = 'https://picsum.photos/350/450'

    const settings = {

    }

    return (
        <section>
            <Carousel slidePercentage={30} {...settings}>
                <div>
                    <img src={photoURL} alt="random" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={photoURL} alt="random" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={photoURL} alt="random" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src={photoURL} alt="random" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src={photoURL} alt="random" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        </section>
    )
}

PostSlider.prototypes = {
    posts: PropTypes.array.isRequired
}
