import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import GameCard from './GameCard';

export default function GamesOwner(props) {
    const gamesMapper = () => {
        if (props.games.length === 0) {
            return (
                <Col className="text-center">
                    <h3>
                        No Games. {props.isOwner ? 'Go get some.' : 'Tell your friend to go get some.'}
                    </h3>
                    <small>Empty Shelf Visual?</small>
                </Col>
            );
        } else {
            return props.games.map((game, index) => {
                // console.log(JSON.stringify(game, null, 2));
                return (
                    <Col sm='6' md='4' key={index}>
                        <GameCard
                            id={game.gameId}
                            src={game.img}
                            title={game.title}
                            isOwner={props.isOwner}
                            gameId={game.id}
                            removeGame={props.removeGame}
                        />
                        {/* {props.isOwner ? <Button onClick={() => props.removeGame(game.id)}>Remove Game from Library</Button> : ''} */}
                    </Col>
                )
            })
        }
    }

    // Run once on page load
    useEffect(() => {
        props.fetchGames(props.ownerid);
    }, [])

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h2>My Games</h2>
                    </Col>
                </Row>
                <Row>
                    {gamesMapper()}
                </Row>
            </Container>
        </>
    );
}