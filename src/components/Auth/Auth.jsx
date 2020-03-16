import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Login from './Login';
import Signup from './Signup';
import './Auth.css';

export default function Auth(props) {
    const [showLogin, setShowLogin] = useState(true);
    const toggle = (e) => {e.preventDefault(); setShowLogin(!showLogin);};
    return (
        <Container className="auth-container">
            <Row>
                <Col md={{ size: 4, offset: 4 }}>
                    {showLogin ?
                        <Login updateToken={props.updateToken} />
                        : <Signup updateToken={props.updateToken} />
                    }
                    <a href="/" className="loginToggle" onClick={toggle}>{showLogin ? 'New Here? Create an Account' : 'Log in with an Existing Account'}</a>
                </Col>
            </Row>
        </Container>
    );
}