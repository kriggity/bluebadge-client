import React, { useState, useEffect } from 'react';
import { Form, Label, Input, Button, Container, Col, Row } from 'reactstrap';
import GameCard from './GameCard';

export default function SearchAPIGames(props) {

    const [searchStr, setSearchStr] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const fetchArray = () => {
        // Clear in case there are items from a previous search
        setSearchResults([]);

        let tempStr = encodeURI(searchStr);
        let fetchURL = `https://www.boardgameatlas.com/api/search?name=${tempStr}&client_id=clZBrtwxDp&fuzzy_match=true&limit=9`;

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(fetchURL, requestOptions)
            .then(response => response.json())
            .then(result => setSearchResults(result))
            .catch(error => console.log('error', error));
    }

    const resultsMapper = () => {
        if (searchResults.length === 0) {
            return
        } else {
            // console.log(searchResults.games);
            return searchResults.games.map((result, index) => {
                return (
                    <Col md="4" key={index}>
                        <GameCard id={result.id} src={result.images.medium} title={result.name} />
                        {/* <Button onClick={() => props.addGame(gameDetails)}>Add to My Library</Button>
                        <Button onClick={() => props.removeGame(gameDetails.id)}>Remove from My Library</Button> */}

                    </Col>
                );
            })
        }
    }


    const handleSubmit = event => {
        event.preventDefault();
        if (searchStr !== '') {
            fetchArray();
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h3>Search Games</h3>
                        <Form onSubmit={handleSubmit}>
                            <Label htmlFor="search">Search by Name</Label>
                            <Input
                                name="search"
                                value={searchStr}
                                onChange={
                                    e => {
                                        setSearchStr(e.target.value)
                                    }
                                }
                            />
                            <Button type="submit">Search</Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    {resultsMapper()}
                </Row>
            </Container>
        </>
    );
}