import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Login from './Login';
import Signup from './Signup';
import './Auth.css';

export default function Auth(props) {
    const [showLogin, setShowLogin] = useState(true);
    const toggle = (e) => { e.preventDefault(); setShowLogin(!showLogin); };
    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <div className="outerwrapper">
                    <div className="innerwrapper">
                        {showLogin ?
                            <Login updateToken={props.updateToken} />
                            : <Signup updateToken={props.updateToken} />
                        }
                        <div className="loginToggle">
                            <a href="/" onClick={toggle}>{showLogin ? 'New Here? Create an Account' : 'Log in with an Existing Account'}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}