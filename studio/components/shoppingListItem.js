import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormField from 'part:@sanity/components/formfields/default'

import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'

//Nutrition API details
const nut_id = process.env.SANITY_STUDIO_NUTRITIONIX_APP_ID;
const nut_key = process.env.SANITY_STUDIO_NUTRITIONIX_API_KEY;

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
        const url = `https://trackapi.nutritionix.com/v2/search/instant?query=${event.target.value}`;
        fetch(url, {
            method: 'GET',
            // mode: 'no-cors',
            headers: {
                'x-app-id': nut_id,
                'x-app-key': nut_key,
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
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