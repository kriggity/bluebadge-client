import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './MyAccount.css';
import APIURL from '../../helpers/environments';

export default function MyAccount(props) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const getOneUser = () => {
        fetch(`${APIURL}/user/${props.ownerid}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
            .then(res => res.json())
            .then(userData => {
                setFullName(userData.fullname);
                setEmail(userData.email);
                setPassword(userData.password);
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => getOneUser(), [])

    const handleSubmit = e => {
        e.preventDefault();

        console.log(fullName, email, password);
        // let myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");

        // let raw = JSON.stringify({
        //     "user":
        //     {
        //         "fullname": fullName,
        //         "email": email,
        //         "password": password
        //     }
        // });

        // let requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };

        // fetch(`${APIURL}/user/createuser`, requestOptions)
        //     .then(response => response.text())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));
    }


    return (
        <Container className="myAccount">
            <Row>
                <Col className="text-center">
                    <h1>My Account</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={{ size: 8, offset: 2 }} sm={{ size: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                name="fullName"
                                type="text"
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                name="email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                name="password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FormGroup>
                        <Button type="Submit">Update</Button>
                    </Form>
                </Col>
            </Row >
        </Container >
    );
}