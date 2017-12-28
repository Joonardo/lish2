import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Form, FormGroup, Button, Col} from 'react-bootstrap';

import Fields from './Fields.jsx';

class Main extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form horizontal>
                <FormGroup>
                    <Col xs={9} sm={9} md={9} lg={9}>
                        <Fields.Long />
                    </Col>
                    <Col xs={3} sm={3} md={3} lg={3}>
                        <Button>Submit</Button>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Col xs={8}>
                        Specify short url here:
                    </Col>
                    <Col xs={4}>
                        <Fields.Short />
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}

export default Main;
