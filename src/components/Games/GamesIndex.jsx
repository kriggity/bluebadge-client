import React, { useState, useEffect } from 'react';
// import { Container, Row, Col } from 'reactstrap';
import './Games.css';
import SearchGames from './SearchGames';
import GamesOwner from './GamesOwner';
import GameProfile from './GameProfile';
import APIURL from '../../helpers/environments';
import BGA_CLIENT_ID from '../../helpers/bga_client_id';

export default function GamesIndex(props) {
    // const BGA_CLIENT_ID = 'clZBrtwxDp';
    /************************************************
    ** Add Game
    ************************************************/
    const addGame = (details) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", props.token);

        // Verify and assign image url for game
        let imgPath = () => {
            return (details.images.original !== '') ? details.images.original
                : (details.images.large !== '') ? details.images.large
                    : (details.images.medium !== '') ? details.images.medium
                        : 'https://via.placeholder.com/300';
        }
        // console.log(imgPath());

        let raw = JSON.stringify({
            "game": {
                "gameId": details.id,
                "title": details.name,
                "img": imgPath()
            }
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch(`${APIURL}/game/create`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                fetchGames(props.ownerid);
            })
            .catch(error => console.log('error', error));
    }

    /************************************************
    ** Update One Owner's Game (just comments for now)
    ************************************************/
    const [updateComments, setUpdateComments] = useState('');
    const updateGame = (e) => {
        e.preventDefault();
        console.log(updateComments);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", props.token);

        const raw = JSON.stringify(
            {
                "game":
                {
                    "comments": updateComments
                }
            }
        );

        const requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${APIURL}/game/${selectedGameId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                fetchGames(props.ownerid);
                console.log(result);
                console.log('updated');
            })
            .catch(error => console.log('error', error));
    }

    /************************************************
    ** Remove Game
    ************************************************/
    const removeGame = (id) => {
        // console.log(`remove id: ${id}`);
        fetch(`${APIURL}/game/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
            .then(() => {
                console.log("deleted");
                fetchGames(props.ownerid);
            });
        // .then(() => fetchGames());
        // .then(response => response.json())
        // .then(result => console.log(result))
        // .catch(error => console.log('error', error));
    }

    /****************************************************
    ** Fetch One Game from BGA API
    ****************************************************/
    const [gameDetails, setGameDetails] = useState([]);

    const fetchOneGame = id => {
        fetch(`https://www.boardgameatlas.com/api/search?limit=1&client_id=${BGA_CLIENT_ID}&ids=${id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json())
            .then(gamesData => {
                setGameDetails(gamesData.games[0]);
            })
            .catch(error => console.log('error', error));
    }

    /****************************************************
    ** Fetch all games of one owner
    ****************************************************/
    const [games, setGames] = useState([]);

    const fetchGames = ownerId => {
        fetch(`${APIURL}/game/user/${ownerId}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
            .then(res => res.json())
            .then(gamesData => {
                setGames(gamesData);
            })
            .catch(error => console.log('error', error));

    }

    /****************************************************
    Check if one game exists in an owner's library
    ** Passed as a prop to and ran in GameProfile
    ****************************************************/
    const [inLibraryBool, setInLibraryBool] = useState(false);
    const [selectedGameId, setSelectedGameId] = useState('');
    const [selectedGameComments, setSelectedGameComments] = useState('');

    useEffect(() => {
        if (games.length !== 0 && gameDetails.length !== 0) {
            let gameIds = games
                .filter((val => val.gameId === gameDetails.id), [0]);
            if (gameIds.length !== 0) {
                setSelectedGameId(gameIds[0].id);
                setInLibraryBool(true);
                setSelectedGameComments(gameIds[0].comments);
            } else {
                setInLibraryBool(false);
            }
        }
    })

    /****************************************************
    ** Hacky Sub Routing
    ****************************************************/

    const gamesView = () => {
        const searchObj =
            <SearchGames
                addGame={addGame}
                removeGame={removeGame}
            />;
        switch (props.view) {
            case 'search':
                return (searchObj);
                break;
            case 'owner':
                return (
                    <GamesOwner
                        ownerid={props.ownerid}
                        token={props.token}
                        removeGame={removeGame}
                        games={games}
                        setGames={setGames}
                        fetchGames={fetchGames}
                        isOwner={true} // Change these with addition of Friends functionality
                    />
                );
                break;
            case 'profile':
                return (
                    <GameProfile
                        ownerid={props.ownerid}
                        addGame={addGame}
                        removeGame={removeGame}
                        fetchOneGame={fetchOneGame}
                        fetchGames={fetchGames}
                        gameDetails={gameDetails}
                        games={games}
                        setGames={setGames}
                        inLibraryBool={inLibraryBool}
                        selectedGameId={selectedGameId}
                        selectedGameComments={selectedGameComments}
                        updateGame={updateGame}
                        setUpdateComments={setUpdateComments}
                        isOwner={true} // Change these with addition of Friends functionality
                    />
                );
                break;
            default:
                return (searchObj);
        }
    }

    /************************************************
    ** Return
    ************************************************/
    return (
        <>
            {gamesView()}
        </>
    );
}

//  Index
//      Search Games
//          BGA Get Many
//      Game List by Owner
//          My Games
//              Server Get
//              Delete
//      Game Profile
//          BGA Get One
//          Add
//          Delete  







//  Index
//      BGA Get Many
//      Add
//      Delete
//  Game List by Owner
//      My Games
//          Server Get
//          Delete
//      Friend Games
//          Server Get
//          Add
//  Game Profile
//      BGA Get One
//      Add
//      Delete 