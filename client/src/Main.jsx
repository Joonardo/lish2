import React, {Component} from 'react';
import {Form, FormGroup, Button, Col, Modal} from 'react-bootstrap';

import Fields from './Fields.jsx';
import Api from './Api.jsx';

class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            valid: false,
            added: undefined
        }

        this.changed = this.changed.bind(this)
        this.submit = this.submit.bind(this)
        this.modalClose = this.modalClose.bind(this)
    }

    async submit(ev) {
        ev.preventDefault()
        if(this.state.valid) {
            const success = await Api.add(this.short.value(), this.long.value())

            this.setState(Object.assign(
                this.state,
                {added: success}
            ))
        }
    }

    changed() {
        this.setState(Object.assign(
            this.state,
            {valid: this.short.isValid() && this.long.isValid()}
        ))
    }

    modalClose() {
        this.short.refresh(this.state.added)
        this.setState(
            Object.assign(this.state, {added: undefined})
        )
    }

    render() {
        return (
            <div>
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
                                bsStyle="primary"
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

                <Modal
                    show={this.state.added === true}
                    onHide={this.modalClose}
                >
                    <Modal.Header>
                        <Modal.Title>Wow, you have created a lished link!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        You can now go to http://localhost:3000/... to get redirected to ....
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.modalClose}>Close.</Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={this.state.added === false}
                    onHide={this.modalClose}
                >
                    <Modal.Header>
                        <Modal.Title>Oops, something went wrong...</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button onClick={this.modalClose}>Close.</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Main;
