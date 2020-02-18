import React from 'react'
import Proptypes from 'prop-types'

import { Section, GridContainer } from '../layout'

export const PostMainContent = ({ children }) => {

    return (
        <Section spacingTop={{'monitor': 5, 'laptop': 4, 'tablet': 3}} spacingBottom={{'monitor': 5, 'laptop': 4, 'tablet': 3}}>
            <GridContainer>
                {children}
            </GridContainer>
        </Section>
    )
}

PostMainContent.propTypes = {
    children: Proptypes.node.isRequired
}