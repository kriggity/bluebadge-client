import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import "./Home.css";
import GamesIndex from '../Games/GamesIndex';

export default function Home(props) {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>Home</h2>
                    <GamesIndex view="search" />
                    <GamesIndex ownerid={props.ownerid} token={props.token} view="owner" />
                </Col>
            </Row>
        </Container>
    );
}