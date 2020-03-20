import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Container, Col, Row } from 'reactstrap';
import GameCard from './GameCard';
import BGA_CLIENT_ID from '../../helpers/bga_client_id';
import './SearchGames.css';

export default function SearchAPIGames(props) {

    const [searchStr, setSearchStr] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const fetchArray = () => {
        // Clear in case there are items from a previous search
        setSearchResults([]);

        let tempStr = encodeURI(searchStr);
        let searchLimit = 0;
        let fetchURL = `https://www.boardgameatlas.com/api/search?name=${tempStr}&client_id=${BGA_CLIENT_ID}&fuzzy_match=true`;

        if (searchLimit > 0) {
            fetchURL = fetchURL + `&limit=${searchLimit}`;
        }

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
            <Container className="searchGames">
                <Row>
                    <Col className="text-center"><h1>Search Games</h1></Col>
                </Row>
                <Row>
                    <Col>
                        <Form inline onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label hidden htmlFor="search">Search by Name</Label>
                                <Input
                                    name="search"
                                    value={searchStr}
                                    placeholder="search by name"
                                    onChange={
                                        e => {
                                            setSearchStr(e.target.value)
                                        }
                                    }
                                />
                                <Button type="submit">Search</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                <Row className="results">
                    {resultsMapper()}
                </Row>
            </Container>
        </>
    );
}