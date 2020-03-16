import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Games.css';
import SearchGames from './SearchGames';
import GamesOwner from './GamesOwner';
import GameProfile from './GameProfile';
import APIURL from '../../helpers/environments';

export default function GamesIndex(props) {
    /************************************************
    ** Add Game
    ************************************************/
    const addGame = details => {
        // console.log(`id: ${details.id}, name: ${details.name}, images.medium: ${details.images.medium}`);
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
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    /************************************************
    ** Remove Game
    ************************************************/
    const removeGame = id => {
        // console.log(`remove id: ${id}`);
        fetch(`${APIURL}/game/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
            .then(() => console.log("deleted"));
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
        fetch(`https://www.boardgameatlas.com/api/search?limit=1&client_id=clZBrtwxDp&ids=${id}`, {
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
    // let isOwner;
    // (props.ownerid === localStorage.userid) ? isOwner = true : isOwner = false;
    // console.log(props.ownerid);

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
                setMyGameIds(gamesData);
                // console.log('gamesData',gamesData);
            })
            .catch(error => console.log('error', error));

    }


    const [myGameIds, setMyGameIds] = useState([]);

    useEffect(() => {
        // fetchGames(props.userid);
        // setGames(["foo",'bar']);
        // setMyGameIds(["bar",'foo']);
        // console.log('games', games);
        // console.log('myGameIds', myGameIds);
    }, [])

    /****************************************************
    Check if one game exists in an owner's library
    ** Passed as a prop to and ran in GameProfile
    ****************************************************/
    const [inLibraryBool, setInLibraryBool] = useState(false);

    const inLibrary = (gameId) => {
        // fetchGames(props.ownerid);
        // console.log(props);
        // console.log(`inLibraryBool: ${inLibraryBool}`)
        // console.log(`props.ownerid: ${props.ownerid}`);
        // console.log(`gameId: ${gameId}`);
        // console.log(`games: ${games}`);
    }
    // useEffect(() => {
    //     inLibrary('eZNNBwDUyN');
    // },[]);


    /****************************************************
    ** Hacky Sub Routing
    ****************************************************/

    const gamesView = () => {
        // let isOwner;
        // (props.ownerid === localStorage.userid) ? isOwner = true : isOwner = false;
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
                // console.log(`props.ownerid: ${JSON.stringify(props.ownerid, null, 2)}`);
                // console.log(props);

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
                        inLibrary={inLibrary}
                        inLibraryBool={inLibraryBool}
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