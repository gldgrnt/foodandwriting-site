import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const VerticalPost = ({ post, active }) => {

    return (
        <div>Hello this is a vertical post</div>
    )
}

VerticalPost.prototypes = {
    post: PropTypes.object.isRequired,
    active: PropTypes.boolean
}