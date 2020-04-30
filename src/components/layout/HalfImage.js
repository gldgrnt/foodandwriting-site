
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Img from 'gatsby-image/withIEPolyfill'

import { GridContainer } from './index'
import { responsiveBreakpointDown } from '../../utils'

/**
 * HalfImagePage component
 */ 
export const HalfImage = ({ children, fluidImageProps }) => {

    return (
        <HalfImageContainer>
            <StickyImageWrapper>
                <Img fluid={fluidImageProps} />
            </StickyImageWrapper>

            <GridContainer justify="flex-end">
                <ContentWrapper>
                    {children}
                </ContentWrapper>
            </GridContainer>
        </HalfImageContainer>
    )
}

/**
 * PropTypes
 */
HalfImage.propTypes = {
    children: PropTypes.node.isRequired,
    fluidImageProps: PropTypes.object.isRequired,
}

/**
 * Styles
 */
const HalfImageContainer = styled.div`
    position: relative;
    min-height: calc(100vh - 180px);

    ${responsiveBreakpointDown('tablet', `min-height: calc(100vh - 160px);`)}
    ${responsiveBreakpointDown('mobile', `
        display: flex;
        flex-direction: column;
        min-height: 0;
    `)}

    > * {
        height: 100%;
    }
`

const StickyImageWrapper = styled.div`
    position: absolute;
    height: 100%;
    width: calc(50vw - 80px);
    top: 0;
    right: calc(50% + 80px);

    ${responsiveBreakpointDown('mobile', `
        position: relative;
        order: 2;
        width: 100%;
        left: 0;
        margin-top: 60px;
    `)}

    > * {
        position: sticky !important;
        top: 78px;
        height: 100%;
        max-height: calc(100vh - 78px);
        width: 100%;
        max-width: 1000px;
        margin-left: auto;
    }
`

const ContentWrapper = styled.div`
    padding-top: 80px;
    flex-basis: 50%;

    ${responsiveBreakpointDown('mobile', `
        padding-top: 40px;
        flex-basis: 100%;
    `)}
`