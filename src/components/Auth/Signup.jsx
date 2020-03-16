import React, { useState } from 'react';
import { Form, FormGroup, FormFeedback, Label, Input, Button } from 'reactstrap';
import APIURL from '../../helpers/environments';

export default function Signup(props) {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        fetch(`${APIURL}/user/createuser`, {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    fullname: fullname,
                    email: email,
                    password: password
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json())
            .then(data => props.updateToken(data.sessionToken))
            .catch(error => console.log('error', error));
    }
    return (
        <>
            <h2>Signup</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input name="fullname" value={fullname} onChange={e => setFullname(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input required name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <FormFeedback>Please enter a valid email address.</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input required name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <FormFeedback>Please enter your password.</FormFeedback>
                </FormGroup>
                <Button type="submit">Create Account</Button>
            </Form>
        </>
    );
}