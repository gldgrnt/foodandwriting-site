import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FormField from 'part:@sanity/components/formfields/default'
import styled from 'styled-components'
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'
import styles from '../styles/shoppingListItem.css'

//Nutrition API details
const nut_id = process.env.SANITY_STUDIO_NUTRITIONIX_APP_ID;
const nut_key = process.env.SANITY_STUDIO_NUTRITIONIX_API_KEY;

//Func() to tell sanity that the value has been updated
const createPatchFrom = value => PatchEvent.from(value === '' ? unset() : set(String(value)))

//Func() to capitalise a string
const capitalise = s => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}


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
            userValue: props.value || '',
            resultsOpen: false,
            results: [],
        }
        //Bind functions
        this.onChange = this.onChange.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.handleResultClick = this.handleResultClick.bind(this)
        //Timer
        this.timer = '';
        this.timerInterval = 750;
    }

    //Event Methods
    focus() {
        this._inputElement.focus()
    }

    onChange(event) {
        //Update the value on sanity
        this.setState({ userValue: event.target.value })
    }

    onKeyUp(event) {
        let val = event.target.value;
        clearTimeout(this.timer);
        if (val === '') {
            this.setState({ resultsOpen: false })
        } else {
            this.timer = setTimeout(() => { this.getIngredients(val) }, this.timerInterval);
        }
    }

    handleResultClick(event) {
        event.preventDefault();
        let val = event.target.getAttribute('value');
        this.props.onChange(
            createPatchFrom(val)
        )
        this.setState({
            resultsOpen: false,
            userValue: val
        })
    }

    //Other methods
    getIngredients(query) {
        if (query === '') {
            this.setState({ results: [] })
            return
        }

        const url = `https://trackapi.nutritionix.com/v2/search/instant?query=${query}&branded=false&common=true&common_general=true&locale=en_GB`;
        fetch(url, {
            method: 'GET',
            headers: {
                'x-app-id': nut_id,
                'x-app-key': nut_key,
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.setState({ results: data.common, resultsOpen: true })
                return
            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        const { type } = this.props

        return (
            <FormField label={type.title} description={type.description}>
                <div style={{ position: 'relative' }}>
                    <input
                        placeholder={'Start typing to search for an ingredient'}
                        value={this.state.userValue}
                        onChange={this.onChange}
                        ref={element => this._inputElement = element}
                        onKeyUp={this.onKeyUp}
                    />
                    {// Search results
                        this.state.resultsOpen &&
                        <ul className={styles.resultsList}>
                            {
                                this.state.results.map((result, index) =>
                                    <li key={index + result.food_name}>
                                        <a href="#" className={styles.resultsListLink}
                                            value={capitalise(result.food_name)}
                                            onClick={this.handleResultClick}>
                                            {capitalise(result.food_name)}
                                        </a>
                                    </li>
                                )
                            }
                        </ul>
                    }
                </div>
            </FormField>
        )
    }
}

export default ShoppingListItem