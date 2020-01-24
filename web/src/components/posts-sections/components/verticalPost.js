import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const VerticalPost = ({ post }) => {

    return (
        <StyledImage src={post.featuredImage.asset.fluid.srcWebp} alt="placeholder" />
    )
}

VerticalPost.prototypes = {
    post: PropTypes.object.isRequired,
    active: PropTypes.boolean
}

// const StyledPost = styled.div`
//     max-width: 350px;
// `

const StyledImage = styled.img`
    height: 450px;
    width: 350px;
`