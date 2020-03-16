import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Footer.css';

export default function Footer() {
    return (
        <>
            <Container fluid className="footer">
                <Row>
                    <Col className="text-center">
                        &copy; <a href="https://www.kriggity.com" rel='noreferrer noopener' target="_blank">kriggity.com</a> {new Date().getFullYear()}
                    </Col>
                </Row>
            </Container>
        </>
    );
}