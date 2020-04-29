import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FiX } from 'react-icons/fi'
import { PoweredBy } from 'react-instantsearch-dom'

import { Button } from '../../ui'

/**
 * SearchBarFooter component
 */
export const SearchBarFooter = ({ closeDropdown }) => {
    return (
        <SearchBarFooterWrapper>
            <Button secondary onClick={closeDropdown}><FiX/> Close search</Button>
            <StyledPoweredBy translations={{ searchBy: 'Powered by'}} />
        </SearchBarFooterWrapper>
    )
}

/**
 * PropTypes
 */
SearchBarFooter.propTypes = {
    closeDropdown: PropTypes.func.isRequired
}

/**
 * Styles
 */
const SearchBarFooterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding-top: 20px;

    button {
        display: inline-flex;
        align-items: center;

        svg {
            stroke-width: 3px;
            margin-right: 3px;
        }
    }
`

const StyledPoweredBy = styled(PoweredBy)`
    display: flex;
    align-items: center;

    span {
        display: inline-block;
        font-family: ${props => props.theme.font.family.sans};
        text-transform: uppercase;
        font-weight: 600;
        font-size: ${props => props.theme.font.size.tiny};
        margin-right: 5px;
        color: ${props => props.theme.color.darkGrey};
    }

    a {
        display: inline-flex;

        svg {
            width: 70px;
            height: auto;

            path {
                &:first-of-type { fill: #bbb !important;}
                &:last-of-type { fill: #555 !important;}
            }
        }
    }
`