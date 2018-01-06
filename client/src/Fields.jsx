import React, {Component} from 'react';
import {FormControl, FormGroup, Collapse, Well} from 'react-bootstrap';
import {isWebUri} from 'valid-url';

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

        this.changed = this.changed.bind(this)
        this.isValid = this.isValid.bind(this)
        this.value = this.value.bind(this)
        this.getPlaceholder = this.getPlaceholder.bind(this)
        this.refresh = this.refresh.bind(this)
        this.validate = this.validate.bind(this)
    }

    async refresh(added) {
        if(added) {
            this.getPlaceholder()
        }
        this.validate()
    }

    async getPlaceholder() {
        const ph = await Api.placeholder()
        this.setState( Object.assign(
            this.state,
            {placeholder: ph}
        ))
    }

    componentDidMount() {
        this.getPlaceholder()
    }

    value() {
        if(this.state.value.length === 0) {
            return this.state.placeholder
        }
        return this.state.value
    }

    isValid() {
        return this.state.validation === 'success'
    }

    async changed(ev) {
        // TODO make this function more rational
        await this.setState(Object.assign(
            this.state,
            {value: ev.target.value}
        ))

        this.validate()
    }

    async validate() {
        if(this.state.value.length === 0) {
            this.setState( Object.assign(
                this.state,
                {validation: 'success'}
            ))
            this.props.onChange()
            return
        }

        if(!/^[a-zA-Z0-9]+$/.test(this.state.value)) {
            this.error = 'Short url should only contain a-z, A-Z or 0-9.'
            this.setState( Object.assign(
                this.state,
                {validation: 'error'}
            ))
            this.props.onChange()
            return
        }

        const exists = await Api.exists(this.state.value)
        if(exists) {
            this.error = 'Short url already exists.'
            this.setState( Object.assign(
                this.state,
                {validation: 'error'}
            ))
            this.props.onChange()
            return
        }

        this.setState( Object.assign(
            this.state,
            {validation: 'success'}
        ))

        this.props.onChange()

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
    constructor(props) {
        super(props)

        this.state = {
            value: ''
        }

        this.validation = 'error'

        this.isValid = this.isValid.bind(this)
        this.changed = this.changed.bind(this)
        this.value = this.value.bind(this)
    }


    value() {
        return this.state.value
    }


    isValid() {
        return this.validation === 'success'
    }

    changed(ev) {
        this.setState({
            value: ev.target.value
        })

        this.validation = isWebUri(ev.target.value) ? 'success' : 'error'

        this.props.onChange(ev)
    }

    render() {
        return (
            <FormGroup validationState={this.validation}>
                <FormControl
                    placeholder="Insert your long url here"
                    type="text"
                    value={this.state.value}
                    onChange={this.changed}
                />
                <FormControl.Feedback />
            </FormGroup>
        )
    }
}

const Fields = {
    Long: Long,
    Short: Short
}

export default Fields;
