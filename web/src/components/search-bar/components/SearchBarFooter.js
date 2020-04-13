import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FiX } from 'react-icons/fi'

import { Button } from '../../ui'

/**
 * SearchBarFooter component
 */
export const SearchBarFooter = ({ closeDropdown }) => {
    return (
        <SearchBarFooterWrapper>
            <Button secondary onClick={closeDropdown}><FiX/> Close search</Button>
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