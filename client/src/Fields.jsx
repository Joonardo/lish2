import React, {Component} from 'react';
import {FormControl, FormGroup, Collapse, Well} from 'react-bootstrap';

import Api from './Api.jsx';

class Short extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            validation: "success",
            placeholder: ""
        };

        this.error = ''

        this.changed = this.changed.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    async componentDidMount() {
        const ph = await Api.placeholder()
        this.setState( Object.assign(
            this.state,
            {placeholder: ph}
        ))
    }

    isValid() {
        return this.state.validation === 'success'
    }

    async changed(ev) {
        console.log(this.placeholder);
        this.setState(Object.assign(
            this.state,
            {value: ev.target.value}
        ))

        if(this.state.value.length === 0) {
            this.setState( Object.assign(
                this.state,
                {validation: 'success'}
            ))
            return;
        }

        if(!/^[a-zA-Z0-9]+$/.test(this.state.value)) {
            this.error = 'Short url should only contain a-z, A-Z or 0-9.'
            this.setState( Object.assign(
                this.state,
                {validation: 'error'}
            ))
            return;
        }

        const exists = await Api.exists(this.state.value)
        if(exists) {
            this.error = 'Short url already exists.'
            this.setState( Object.assign(
                this.state,
                {validation: 'error'}
            ))
            return;
        }

        this.setState( Object.assign(
            this.state,
            {validation: 'success'}
        ))

    }

    render() {
        return (
            <FormGroup validationState={this.state.validation}>
                <FormControl
                    type="text"
                    onChange={this.changed}
                    value={this.state.value}
                    placeholder={this.state.placeholder}
                />
                <FormControl.Feedback />

                <Collapse in={this.state.validation === 'error'}>
                    <div><Well bsSize="small">{this.error}</Well></div>
                </Collapse>
            </FormGroup>
        )
    }
}

class Long extends Component {
    getValidationState = () => {
        return null;
    }

    render() {
        return (
            <FormGroup validationState={this.getValidationState()}>
                <FormControl
                    type="text"
                />
            </FormGroup>
        )
    }
}

const Fields = {
    Long: Long,
    Short: Short
}

export default Fields;
