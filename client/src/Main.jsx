import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import {Form, FormGroup, Button, Col} from 'react-bootstrap';

import Fields from './Fields.jsx';
import Api from './Api.jsx';

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            valid: false
        }

        this.changed = this.changed.bind(this)
        this.submit = this.submit.bind(this)
    }

    async submit(ev) {
        ev.preventDefault()
        if(this.state.valid) {
            const success = await Api.add('test', 'url')
        }
    }

    changed(ev) {
        this.setState({valid: this.short.isValid() && this.long.isValid()})
    }

    render() {
        return (
            <Form horizontal>
                <FormGroup>
                    <Col xs={9} sm={9} md={9} lg={9}>
                        <Fields.Long
                            ref={ (input) => { this.long = input; }}
                            onChange={this.changed}
                        />
                    </Col>
                    <Col xs={3} sm={3} md={3} lg={3}>
                        <Button
                            onClick={this.submit}
                            disabled={!this.state.valid}
                        >Submit</Button>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col xs={8}>
                        Specify short url here:
                    </Col>
                    <Col xs={4}>
                        <Fields.Short
                            ref={ (input) => { this.short = input; }}
                            onChange={this.changed}
                        />
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

export default Main;
