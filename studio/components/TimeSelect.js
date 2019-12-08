import React from 'react'
import PropTypes from 'prop-types'
import { FiPlus, FiMinus } from 'react-icons/Fi'
import styled from 'styled-components'

class TimeSelect extends React.Component {
    static propTypes = {
        type: PropTypes.shape({
            title: PropTypes.string,
        })
    }

    focus() {
        this._inputElement.focus()
    }

    render() {

        return (
            <Container>
                <NumInput type="number" placeholder="hh mm" />
                <Button><FiPlus /></Button>
                <Button><FiMinus /></Button>
            </Container>
        )
    }
}

//Styles
const shared = {
    border: '1px solid rgba(23, 23, 23, 0.2)',
    borderRadius: '2px',
    padding: '0.2em 0.5em'
}

const Container = styled.div`
    display: flex;
    align-items: stretch
`

const NumInput = styled.input`
    display: block;
    flex-grow: 1;
    border: ${shared.border};
    border-radius: ${shared.borderRadius};
    padding: ${shared.padding};
    line-height: 2em;
    -moz-appearance:textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`

const Button = styled.button`
    display: flex;
    width: 40px;
    margin-left: 5px;
    border: ${shared.border};
    border-radius: ${shared.borderRadius};
    padding: ${shared.padding};
    justify-content: center;
    align-items: cemter;
`

export default TimeSelect
