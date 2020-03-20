import React, { useState } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import './GameCard.css';

export default function GameCard(props) {

    const [src, setSrc] = useState(props.src);
    const [title, setTitle] = useState(props.title);
    // const [id, setId] = useState(props.id);
    const [apiId, setApiId] = useState(props.id);

    return (
        <>
            <Card>
                <div style={{ backgroundImage: "url(" + src + ")" }} className="card-img"></div>
                <CardBody>
                    <CardTitle><p>{title}</p></CardTitle>
                    <Link to={`/game/${apiId}`}>Game Details</Link>
                </CardBody>
            </Card>
        </>
    );
}