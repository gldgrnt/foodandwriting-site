import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

import { SmallCaps, InternalLink } from '../ui'
import { GridContainer } from '../layout'
import { VerticalSliderPost } from './components'

import Glide from '@glidejs/glide'
import '@glidejs/glide/dist/css/glide.core.min.css'
import { responsiveBreakpointDown } from '../../utils'


/**
 * PostSlider component
 */
export const PostSlider = ({title, posts}) => {

    let slider = null

    // Slider set up
    useEffect(() => {

        if (!slider) {
            slider = new Glide('.glide', {
                type: 'slider',
                rewind: false,
                perView: 3
            })
    
            slider.mount()
        }
    }, [])

    return (
        <StyledWrapper className="glide">
            <GridContainer block>
                <UpperWrapper>
                    <TitleWrapper>
                        <SmallCaps as="h2" size="regular" color="black">{title}</SmallCaps>

                        <InternalLink to="/recipes" secondary>View all</InternalLink>
                    </TitleWrapper>

                    <ButtonWrapper data-glide-el="controls">
                        <StyledButton data-glide-dir="<">
                            <FiArrowLeft />
                        </StyledButton>

                        <StyledButton data-glide-dir=">">
                            <FiArrowRight />
                        </StyledButton>
                    </ButtonWrapper>
                </UpperWrapper>
                    

                <div className="glide__track" data-glide-el="track">
                    <ul className="glide__slides">
                        <li className="glide__slide">0</li>
                        <li className="glide__slide">1</li>
                        <li className="glide__slide">2</li>
                        <li className="glide__slide">0</li>
                        <li className="glide__slide">1</li>
                        <li className="glide__slide">2</li>
                    </ul>
                </div>
            </GridContainer>
        </StyledWrapper>
    )
}

/**
 * Proptypes
 */
PostSlider.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
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
        })
    }))
}

/**
 * Styles
 */

const StyledWrapper = styled.div`
    overflow: hidden;
`

const UpperWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 40px;
    padding-top: 3px;
    
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
    
    > * {
        margin: 0;

        &:first-child {
            margin-right: 30px;
        }   
    }
`

const ButtonWrapper = styled.div`
    > *:first-child {
        margin-right: 10px;
    }
`

const StyledButton = styled.button`
    border: none;
    background: none;
    padding: 5px;
    pointer-events: ${props => props.disabled ? 'none' : 'all'};

    ${responsiveBreakpointDown('tablet', `
        display: none;
    `)}

    > svg {
        transform: scale(1.1);
        stroke-width: 2.5px;
        pointer-events: none;
        transition: ${props => props.theme.transition.fast};
        color: ${props => props.disabled ? props.theme.color.lightGrey : props.theme.color.black};
    }
`