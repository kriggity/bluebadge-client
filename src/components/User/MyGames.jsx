import React from 'react';
import GamesOwner from '../Games/GamesOwner';

export default function MyGames(props) {
    return(
        <>
        <h1>My Games</h1>
        <GamesOwner ownerid={props.ownerid} token={props.token}/>
        </>
    );
}