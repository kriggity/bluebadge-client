import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import GameCard from './GameCard';

export default function GamesOwner(props) {
    const gamesMapper = () => {
        if (props.games.length !== 0) {
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
        } else {
            return (
                <>
                    <Col className="text-center">
                        <h3>
                            No Games. {props.isOwner ? 'Go get some.' : 'Tell your friend to go get some.'}
                        </h3>
                        {/* <small>Empty Shelf Visual?</small> */}
                    </Col>
                </>
            );
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
                    <Col className="text-center">
                        <h1>My Games</h1>
                    </Col>
                </Row>
                <Row className="results">
                    {gamesMapper()}
                </Row>
            </Container>
        </>
    );
}