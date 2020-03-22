import React, { useState, useEffect } from 'react';
import { Button, Container, Col, Row, Form, FormGroup, Label, Input } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';
import { useParams } from 'react-router-dom';
import BGA_CLIENT_ID from '../../helpers/bga_client_id';

export default function GameProfile(props) {

    /***********************************************
    ** Board Game Atlas data and functionality
    ***********************************************/

    // Get the BGA API game id from the URL
    let { id } = useParams();

    // BGA Mechanics
    const [mechanics, setMechanics] = useState([]);

    const getMechanics = () => {
        fetch(`https://www.boardgameatlas.com/api/game/mechanics?client_id=${BGA_CLIENT_ID}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json())
            .then(mechanicsData => {
                setMechanics(mechanicsData.mechanics);
            })
            .catch(error => console.log('error', error));
    }

    // BGA Categories
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        fetch(`https://www.boardgameatlas.com/api/game/categories?client_id=${BGA_CLIENT_ID}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json())
            .then(categoriesData => {
                setCategories(categoriesData.categories);
            })
            .catch(error => console.log('error', error));
    }
    /***********************************************
    ** end Board Game Atlas data and functionality
    ***********************************************/

    // Hooks
    const [showComment, setShowComment] = useState(false);
    const toggleEdit = e => { e.preventDefault(); setShowComment(!showComment); };

    // Comment Constructor
    const StaticComment = () => {
        let label = props.selectedGameComments ? 'Edit' : 'Add';
        return (
            <>
                {props.selectedGameComments ? <q>{props.selectedGameComments}</q> : ''}
                <Button onClick={toggleEdit}>{label} Comments</Button>
            </>
        );
    };

    // Details Definition List Constructor
    const GameDetailItem = props => {
        let dt = <dt>{props.dt}</dt>;
        if (props.val1 === undefined || props.val1 === null) {
            return (<></>);
        } else {
            switch (props.type) {
                case 'range':
                    return (
                        <>
                            {dt}
                            <dl>{props.val1} - {props.val2}</dl>
                        </>
                    );
                    break;
                case 'array':
                    return (
                        <>
                            {dt}
                            <dl></dl>
                        </>
                    );
                    break;
                case 'html':
                    return (
                        <>
                            {dt}
                            <dl>{ReactHtmlParser(props.val1)}</dl>
                        </>
                    );
                    break;
                default:
                    if (props.val1 === undefined) {
                        return (<></>);
                    } else {

                        return (
                            <>
                                {dt}
                                <dl>{props.val1}</dl>
                            </>
                        );
                    }
            }
        };
    }

    const renderGame = () => {
        if (props.gameDetails.length === 0) {
            return
        } else {
            // console.log(props.inLibraryBool);
            // console.log(props.gameDetails);
            return (
                <>
                    <div className="card hero">
                        <div className="img-wrapper">
                            <h2 className="gameTitle">{props.gameDetails.name}</h2>
                            <img src={props.gameDetails.images.original} alt={props.gameDetails.name} />
                        </div>
                        <div className="card-body">
                            {props.inLibraryBool
                                ? <Button className="btn btnRemove" onClick={() => {
                                    props.removeGame(props.selectedGameId, id);
                                }}>Remove from My Library</Button>
                                : <Button className="btn btnAdd" onClick={() => {
                                    props.addGame(props.gameDetails, id);
                                }}>Add to My Library</Button>
                            }
                        </div>
                    </div>
                    <div className="card gameComments">
                        <div className="card-body">
                            <div className="comments">
                                <h3>Owner Comments</h3>
                                {
                                    props.inLibraryBool
                                        ? showComment
                                            ? <Form onSubmit={props.updateGame}>
                                                <FormGroup >
                                                    <Label htmlFor="comments">Your Comments About {props.gameDetails.name}</Label>
                                                    <Input
                                                        type="textarea"
                                                        name="comments"
                                                        id="comments"
                                                        defaultValue={props.selectedGameComments}
                                                        onChange={e => props.setUpdateComments(e.target.value)}
                                                    />
                                                </FormGroup>
                                                <Button onClick={toggleEdit}>Cancel</Button>
                                                <Button type="submit">Save Comments</Button>
                                            </Form>
                                            : <StaticComment />
                                        : 'No one has anything to share about this game :('
                                }
                            </div>
                        </div>
                    </div>
                    <div className="card gameDetails">
                        <div className="card-body">
                            <h3>Game Details</h3>
                            <dl>
                                <GameDetailItem
                                    type="range"
                                    dt="Number of Players"
                                    val1={props.gameDetails.min_players}
                                    val2={props.gameDetails.max_players}
                                />
                                <GameDetailItem
                                    type="range"
                                    dt="Time to Play (in minutes)"
                                    val1={props.gameDetails.min_playtime}
                                    val2={props.gameDetails.max_playtime}
                                />
                                <GameDetailItem
                                    dt="Minimum Age"
                                    val1={props.gameDetails.min_age}
                                />
                                <GameDetailItem
                                    // type="array"
                                    dt="Publisher"
                                    val1={props.gameDetails.publisher}
                                />
                                <GameDetailItem
                                    type="html"
                                    dt="Description"
                                    val1={props.gameDetails.description}
                                />
                            </dl>
                        </div>
                    </div>
                </>
            )
        }
    }

    useEffect(() => {
        props.fetchOneGame(id);
        props.fetchGames(props.ownerid);
        // getMechanics();
        // getCategories();
    }, []);


    return (
        <>
            <Container className="gameProfile">
                {/* <Row>

                    <Col md={{ size: 6, offset: 3 }}>
                        <h4>Game Profile</h4>
                    </Col>
                </Row> */}
                <Row>
                    <Col sm={{ size: 10, offset: 1 }} md={{ size: 8, offset: 2 }} lg={{ size: 6, offset: 3 }}>
                        {renderGame()}
                    </Col>
                </Row>
            </Container>
        </>
    );
}