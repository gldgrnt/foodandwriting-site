import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormField from 'part:@sanity/components/formfields/default'

import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'

//Tell sanity that the value has been updated
const createPatchFrom = value => PatchEvent.from(value === '' ? unset() : set(String(value)))

class ShoppingListItem extends Component {
    static propTypes = {
        type: PropTypes.shape({
            title: PropTypes.string,
        }).isRequired,
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            userValue: '',
            results: {},
        }
        //Bind functions
        this.onChange = this.onChange.bind(this);
    }

    //Methods
    focus() {
        this._inputElement.focus()
    }

    onChange(event) {
        //Update the value on sanity
        this.setState({ userValue: event.target.value })
        //this.props.onChange(createPatchFrom(event.target.value))
    }


    render() {
        const { type, value, onChange } = this.props

        return (
            <FormField label={type.title} description={type.description}>
                <input
                    value={this.state.userValue}
                    onChange={this.onChange}
                    ref={element => this._inputElement = element}
                />
            </FormField>
        )
    }
}

export default ShoppingListItem