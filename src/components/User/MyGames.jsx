import React from 'react';
import GamesOwner from '../Games/GamesOwner';

export default function MyGames(props) {
    return(
        <>
        <h3>My Games</h3>
        <GamesOwner ownerid={props.ownerid} token={props.token}/>
        </>
    );
}