import React, {useRef} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

import { GridContainer, GridRow, GridCol } from '../layout'
import { SmallCaps, InternalLink } from '../ui'

export const ParallaxFeaturedTopic = ({ topic }) => {

    const imgSrcSet = topic.recipeCategoryData.categoryOptions.coverPhoto.asset.fluid.srcSetWebp

    // Parallax functionality
    const transformOffset = 50
    let ParallaxContainer = useRef(null)
    let ParallaxImg = useRef(null)

    let options = {rootMargin: '0px', threshold: 0.0001 }
    let observer = new IntersectionObserver(callback, options)

    function callback (entries, observer) {
        const isIntersecting = entries[0].isIntersecting

        if(!window) {
            return;
        }

        if (isIntersecting) {
            window.addEventListener('scroll', doParallax)
        } else {
            window.removeEventListener('scroll', doParallax)
        }
    }

    function doParallax(e) {
        
        if(!window) {
            return;
        }

        const windowCentre = window.scrollY + (window.innerHeight / 2)
        const parallaxCentre = ParallaxContainer.offsetTop + (ParallaxContainer.clientHeight / 2)

        const ratio = windowCentre / parallaxCentre
        ParallaxImg.style.transform = `translateY(${transformOffset - (transformOffset * ratio)}%)`
    }

    useEffect(() => {
        observer.observe(ParallaxContainer)
    })


    return (
        <ParallaxWrapper ref={r => ParallaxContainer = r}>
            <ParallaxImage offset={transformOffset} ref={r => ParallaxImg = r} srcSet={imgSrcSet} alt="Background"/>

            <ContentWrapper>
                <GridContainer>
                    <GridRow>
                        <GridCol cols="4">
                            <SmallCaps size="small" color="white">Featured topic</SmallCaps>
                            <Title>{topic.recipeCategoryData.title} and sentence about</Title>
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                            <InternalLink to={topic.recipeCategoryData.slug.current} secondary>View posts</InternalLink>
                        </GridCol>
                    </GridRow>
                </GridContainer>
            </ContentWrapper>
        </ParallaxWrapper>
    )
}

ParallaxFeaturedTopic.propTypes = {
    topic: PropTypes.object.isRequired
}

const ParallaxWrapper = styled.div`
    position: relative;
    padding: 120px 0;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: ${props => props.theme.color.black};
        opacity: 0.9;
        z-index: 1;
    }
`

const ParallaxImage = styled.img`
    position: absolute;
    top: -${props => props.offset / 2}%;
    left: 0;
    width: 100%;
    height: ${props => 100 + props.offset}%;    
    z-index: 0;
    object-fit: cover;
`

const ContentWrapper = styled.div`
    position: relative;
    z-index: 5;
    color: white;
    min-height: 200px;
`

const Title = styled.h2`
    margin: 15px 0;
    display: block;
`