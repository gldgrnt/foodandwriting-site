import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { SmallCaps } from './SmallCaps'
import { getPostDate } from '../../utils' 

/**
 * Post meta component
 */
export const PostMeta = ({ date = false, meta = [] }) => {

    // Get date
    const postDate = date && getPostDate(date)

    return (
        <MetaWrapper>
            { !!meta.length && meta.map( string => !!string && <SmallCaps key={string} size="small">{string}</SmallCaps> )}
            { postDate && <SmallCaps as="time" size="small" datetime={postDate.raw}>{postDate.formatted}</SmallCaps>}
        </MetaWrapper>
    )
}

/**
 * PropTypes
 */
PostMeta.propTypes = {
    date: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.string.isRequired)
}


/**
 * Styles
 */
const MetaWrapper = styled.div`
    display: flex;
    align-items: center;

    > *:not(:first-child) {
        position: relative;
        margin-left: 15px;

        &::before {
            content: ' · ';
            position: absolute;
            left: -9px; 
        }
    }
`