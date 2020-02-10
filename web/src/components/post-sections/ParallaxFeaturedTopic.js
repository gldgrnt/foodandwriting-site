import React, {useRef} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

// import { GridContainer } from '../layout'

export const ParallaxFeaturedTopic = ({ topic }) => {

    const imgSrcSet = topic.recipeCategoryData.categoryOptions.coverPhoto.asset.fluid.srcSetWebp

    // Parallax functionality
    let ParallaxRef = useRef(null)
    let options = {
        rootMargin: '0px',
        threshold: 0.0001
    }
    let observer = new IntersectionObserver(callback, options)

    function callback (entries, observer) {
        const isIntersecting = entries[0].isIntersecting

        if(!window) {
            return;
        }

        if (isIntersecting) {
            window.addEventListener('scroll', windowCallback)
        } else {
            window.removeEventListener('scroll', windowCallback)
        }
    }

    function windowCallback(e) {
        console.log(window.scrollY - ParallaxRef.offsetTop)
    }

    useEffect(() => {
        observer.observe(ParallaxRef)
    })


    return (
        <ParallaxWrapper ref={r => ParallaxRef = r}>
            <ParallaxImage srcSet={imgSrcSet} alt="Background"/>

            <ContentWrapper>

            </ContentWrapper>
        </ParallaxWrapper>
    )
}

ParallaxFeaturedTopic.propTypes = {
    topic: PropTypes.object.isRequired
}

const ParallaxWrapper = styled.div`
    position: relative;
    padding: 80px 0;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: black;
        opacity: 0.6;
        z-index: 1;
    }
`

const ParallaxImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;    
    z-index: 0;
`

const ContentWrapper = styled.div`
    height: 300px;
`