import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Col, Jumbotron, Form} from 'react-bootstrap';

import Main from './Main.jsx';

class Layout extends Component {
    render() {
        return (
            <div>
                <Jumbotron className="text-center">
                    <h1>Lish</h1>
                </Jumbotron>
                <Col xs={12} xsOffset={0} sm={4} smOffset={4} >
                    <Route path="/" component={Main} />
                </Col>
            </div>
        )
    }
}

export default Layout;
