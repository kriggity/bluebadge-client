import React, { useState } from 'react';
export default function GameCard(props) {

    const [src, setSrc] = useState(props.src);
    const [title, setTitle] = useState(props.title);
    const [id, setId] = useState(props.id);
    const [apiId, setApiId] = useState(props.id);

    return (
        // <>
        //     <Card>
        //         <CardImg src={src} alt={title} />
        //         <CardBody>
        //             <CardTitle>{title}</CardTitle>
        //             <CardLink href={`/game/${apiId}`}>Game Details</CardLink>
        //             {props.isOwner
        //                 ? <Button
        //                     className="btnRemove"
        //                     onClick={() => props.removeGame(props.gameId)}
        //                     title='Remove from My Library'
        //                     close
        //                 />
        //                 : ''}
        //         </CardBody>
        //     </Card>
        // </>
        <div>
            <div style={{backgroundImage: "url(" + src + ")"}} className="gameImg"></div>
            <div>
                <span>{title}</span>
                <br />
                <a href={`/game/${apiId}`}>Game Details</a>
            </div>
        </div>
    );
}