import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Alert } from 'reactstrap';
import "./Home.css";
import BGA_CLIENT_ID from '../../helpers/bga_client_id';
import GameCard from '../Games/GameCard';

export default function Home(props) {
    const [popGames, setPopGames] = useState([]);

    const fetchPopGames = () => {
        fetch(`https://api.boardgameatlas.com/api/search?client_id=${BGA_CLIENT_ID}&limit=12&order_by=popularity`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json())
            .then(gameData => {
                setPopGames(gameData.games);
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => fetchPopGames(), []);

    const GamesMapper = () => {
        if (popGames.length !== 0) {
            return popGames.map((game, index) => {
                return (
                    <Col sm='6' md='4' key={index}>
                        <GameCard
                            src={game.images.original}
                            title={game.name}
                            id={game.id}
                        />
                    </Col>
                );
            })
        } else {
            return (
                <>
                    <Col xs="12" className="text-center">
                        <Alert color="light">
                            Apparently there are no popular games out right now.
                        </Alert>
                    </Col>
                </>
            );
        }
    }

    return (
        <Container className="home">
            <Row>
                <Col className="text-center hero">
                    <p>My Game Library is a catalog of your tabletop games.</p>
                    <Link to="/user/mygames">View My Games</Link>
                    <Link to="/game/search">Search for Games</Link>
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <h2>Popular Games of the Now</h2>
                </Col>
            </Row>
            <Row className="results">
                <GamesMapper />
            </Row>
        </Container>
    );
}