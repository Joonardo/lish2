import React, {Component} from 'react';
import {Alert, ProgressBar, Button, Badge} from 'react-bootstrap';

import Api from './Api.jsx';

class Redirect extends Component {
    constructor(props) {
        super(props)

        this.timeout = 3

        this.state = {
            long: undefined,
            time: this.timeout
        }

        this.countdown = this.countdown.bind(this)
    }

    async countdown() {
        await this.setState(Object.assign(
            this.state,
            {time: this.state.time - 1}
        ))

        if(this.state.time === 0) {
            window.location.href = this.state.url
        }

        setTimeout(this.countdown, 1000)
    }

    componentDidMount() {
        Api.get(this.props.match.params.short)
        .then(
            (res) => {
                if(res.success) {
                    this.setState(Object.assign(
                        this.state,
                        {url: res.url}
                    ))

                    setTimeout(this.countdown, 1000)
                }
            }
        )
    }

    render() {
        if(this.state.url) {
            return (
                <Alert>
                    <p>Redirecting to <Badge>{this.state.url}</Badge> in {this.state.time} seconds.</p><br />
                    <ProgressBar active bsStyle="success" max={this.timeout} now={this.timeout-this.state.time} />
                    <Button href="/" bsStyle="danger" block>Cancel.</Button>
                </Alert>
            )
        }

        return (
            <Alert bsStyle="danger">
                <p>There is no redirection specified.</p><br />
                <Button bsStyle="primary" href="/" block>Click here to create one!</Button>
            </Alert>
        )
    }
}

export default Redirect;
