import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

import { SmallCaps, InternalLink, ScrollDown } from '../ui'
import { GridContainer } from '../layout'
import { RecipeSliderPost } from './components'
import { useMobileStatus } from '../../hooks'

import Glide from '@glidejs/glide'
import '@glidejs/glide/dist/css/glide.core.min.css'
import { responsiveBreakpointDown } from '../../utils'


/**
 * RecipeSlider component
 */
export const RecipeSlider = ({title, posts}) => {

    // Create ID for scroll down component
    const scrollId = 'hero'

    // Get mobile state
    const isMobile = useMobileStatus()

    // Set up states
    const [ slide, setSlide ] = useState(0)
    const atStart = slide === 0
    const atEnd = slide === posts.length - 1

    // Create indicators
    const indicatorArr = new Array(posts.length).fill(0)

    // Slider set up
    useEffect(() => {
        // Create slider
        const slider = new Glide('.glide', {
            type: 'slider',
            rewind: false,
            perView: 4,
            focusAt: 0,
            bound: true,
            gap: 30,
            animationDuration: 700,
            breakpoints: {
                999: {
                    perView: 4
                },
                767: {
                    perView: 1,
                    gap: 0
                }
            }
        })

        // Set up event listeners
        slider.on('run.after', () => {setSlide(slider.index)})

        // Mount slider
        slider.mount()

    }, [])

    return (
        <StyledWrapper className="glide" id={scrollId}>
            <GridContainer block removeMobilePadding={true}>
                <UpperWrapper>
                    <TitleWrapper>
                        <SmallCaps as="h2" size="regular" color="black">{title}</SmallCaps>
                        <InternalLink to="/recipes" secondary>View all</InternalLink>
                    </TitleWrapper>

                    <ButtonWrapper data-glide-el="controls">
                        <StyledButton className={`buttons ${atStart && "disabled"}`} data-glide-dir="<" aria-label="Previous">
                            <FiArrowLeft />
                        </StyledButton>

                        <Indicators slide={slide + 1}>
                            { indicatorArr.map( (item, index) => <li key={index}></li> ) }
                        </Indicators>

                        <StyledButton className={`buttons ${atEnd && "disabled"}`} data-glide-dir=">" aria-label="Next">
                            <FiArrowRight />
                        </StyledButton>
                    </ButtonWrapper>
                </UpperWrapper>
                    

                <div className="glide__track" data-glide-el="track" style={{overflow: "visible", marginRight: 30}}>
                    <ul className="glide__slides" style={{margin: 0}}>
                        {posts.map((post, index) => (
                            <div key={post._id}><RecipeSliderPost key={index} post={post} hasNext={!!posts[index + 1]} hasPrev={!!posts[index - 1]} /></div>
                        ))}
                        { !isMobile && <div></div>}
                    </ul>
                </div>

            </GridContainer>

            { isMobile && <ScrollDown tagId={scrollId} /> }
        </StyledWrapper>
    )
}

/**
 * Proptypes
 */
RecipeSlider.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        slug: PropTypes.shape({
            current: PropTypes.string.isRequired,
        }),
        catgegory: PropTypes.shape({
            singleName: PropTypes.string.isRequired,
            slug: PropTypes.shape({
                current: PropTypes.string.isRequired
            })
        }),
        featuredImage: PropTypes.shape({
            asset: PropTypes.object.isRequired
        })
    }))
}

/**
 * Styles
 */

const StyledWrapper = styled.div`
    overflow: hidden;

    ${props => responsiveBreakpointDown('mobile', `background: ${props.theme.color.blackOverlay};`)}

    > button {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);

        &,
        &:hover,
        &:focus {
            color: white;
        }
    }
`

const UpperWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 40px;
    padding-top: 3px;

    ${props => responsiveBreakpointDown('mobile', `
        display: block;
        position: absolute;
        top: ${props.theme.grid.spacing}px;
        left: ${props.theme.grid.spacing}px;
        width: calc(100% - ${props.theme.grid.spacing * 2}px);
        z-index: 2;

        svg {
            stroke: white;
            transition: opacity ${props => props.theme.transition.fast};
            
            &.disabled {
                opacity: 0.2;
            }
        }
    `)}
    
    > * {
        margin-bottom: 0;
    }
`

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    
    ${responsiveBreakpointDown('tablet', `
        width: 100%;
        justify-content: space-between;
    `)}

    ${responsiveBreakpointDown('mobile', `display: none;`)}

    > * {
        margin: 0;
        &:first-child {
            margin-right: 30px;
        }   
    }
`

const ButtonWrapper = styled.div`

    ${responsiveBreakpointDown('tablet', `display: none;`)}
    ${responsiveBreakpointDown('mobile', `
        display: flex;
        justify-content: space-between;
        align-items: center;

    `)}
    
    > *:first-child {
        margin-right: 10px;
    }
`

const StyledButton = styled.button`
    border: none;
    background: none;
    padding: 5px;
    transition: opacity ${props => props.theme.transition.fast};
    
    &.disabled {
        opacity: 0.4;
        pointer-events: none;
    }

    > svg {
        transform: scale(1.1);
        stroke-width: 2.5px;
        pointer-events: none;
        transition: stroke ${props => props.theme.transition.fast};

        ${responsiveBreakpointDown('mobile', 'stroke: white;')}
    }
`

const Indicators = styled.ul`
    display: none;
    margin: 0;
    padding: 0 0 5px;
    list-style-type: none;
    pointer-events: none;

    ${responsiveBreakpointDown('mobile', 'display: flex;')}
    
    > * {
        height: 6px;
        width: 6px;
        border-radius: 50%;
        background: white;
        margin: 0 2.5px;
        transition: opacity ${props => props.theme.transition.fast};
        opacity: 0.5;

        ${props => `
            &:nth-child(${props.slide}) {
                opacity: 1;
            }
        `}
    }
`