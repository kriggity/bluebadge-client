import React, { useState, useEffect } from 'react';
import { Button, Container, Col, Row } from 'reactstrap';
import { useParams } from 'react-router-dom';

export default function GameProfile(props) {

    // Get the BGA API game id from the URL
    let { id } = useParams();

    const renderGame = () => {
        if (props.gameDetails.length === 0) {
            return
        } else {
            return (
                <>
                    <img src={props.gameDetails.images.original} alt={props.gameDetails.name} />
                    <h3>{props.gameDetails.name}</h3>

                    {addRemoveButtons()}
                    {/* 
                    <MyComments />
                    
                    <FriendComments/>

                    <GameDetails />
                    */}
                </>
            )
        }
    }

    const addRemoveButtons = () => {
        if (props.games.length === 0) {
            return
        } else {
            const gameIds = props.games
                .filter((val => val.gameId === id), [0]);

            if (gameIds.length !== 0) {
                return (<Button onClick={() => props.removeGame(gameIds[0].id)}>Remove from My Library</Button>);
            } else {
                return (<Button onClick={() => props.addGame(props.gameDetails)}>Add to My Library</Button>)
            }
        }
    }

    useEffect(() => {
        props.fetchOneGame(id);
        props.fetchGames(props.ownerid);
    }, []);


    return (
        <>
            <Container className="gameProfile">
                <Row>
                    <Col md={{ size: 6, offset: 3 }}>
                        <h4>Game Profile</h4>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ size: 6, offset: 3 }}>
                        {renderGame()}

                    </Col>
                </Row>
            </Container>
        </>
    );
}