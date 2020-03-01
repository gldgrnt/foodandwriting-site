import React from 'react'
// import styled from 'styled-components'
import PropTypes from 'prop-types'

export const NavigationDropdown = ({ closeDropdown }) => {
    

    return (
        <div>
            Hello world
            <button onClick={closeDropdown}>X</button>
        </div>
    )
}

NavigationDropdown.propTypes = {
    closeDropdown: PropTypes.func.isRequired
}