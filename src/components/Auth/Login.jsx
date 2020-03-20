import React, { useState, useEffect, useRef } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import APIURL from '../../helpers/environments';

export default function Login(props) {

    // Inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Validation
    const firstRender = useRef(true);
    const [disable, setDisabled] = useState(true);
    const [emailError, setEmailError] = useState(null);
    const [passError, setPassError] = useState(null);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        setDisabled(formValidation());
    }, [email, password])

    const formValidation = () => {
        if (email === '') {
            setEmailError('Email required');
            // return true;
        } else if (email !== '') {
            setEmailError(null);
            // return true;
        } else if (password === '') {
            setPassError('Password required');
            // return true;
        } else if (password !== '') {
            setPassError(null);
            // return true;
        }
    }

    const handleSubmit = event => {
        event.preventDefault();

        fetch(`${APIURL}/user/signin`, {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    email: email,
                    password: password
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json())
            .then(data => {
                // console.log('props', props);
                // console.log('data', data);
                localStorage.setItem('userid', data.user.id);
                return props.updateToken(data.sessionToken);
            })
            .catch(error => console.log('error', error));

    }
    return (
        <>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input required name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    {emailError && <p>{emailError}</p>}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input required name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    {passError && <p>{passError}</p>}
                </FormGroup>
                <Button type="submit" disabled={disable}>Log In</Button>
            </Form>
        </>
    );
}