import React, {Component} from 'react';
import {FormControl, FormGroup, HelpBlock, Collapse, Well} from 'react-bootstrap';

class Short extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
        this.changed = this.changed.bind(this);
        this.getValidationState = this.getValidationState.bind(this)
    }

    changed(ev) {
        this.setState(Object.assign(
            this.state,
            {value: ev.target.value}
        ))
    }

    async getValidationState() {
        if(this.state.value.length > 2) return 'success';
        if(this.state.value.length > 0) return 'error';
        return null;
    }

    render() {
        return (
            <FormGroup validationState={this.getValidationState()}>
                <FormControl
                    type="text"
                    onChange={this.changed}
                    value={this.state.value}
                />
                <FormControl.Feedback />

                <Collapse in={this.getValidationState() === 'error'}>
                    <div><Well bsSize="small">Short url already in use.</Well></div>
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
