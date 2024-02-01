import { useState } from 'react';
import Button from '../../elements/Button'
import arrowButton from '../../assets/svg-icons/arrow.svg';

function Settings() {
    function createPlayers() {
        return [
            {
                id: 0,
                name: "Player 1",
            },
            {
                id: 1,
                name: "Player 2",
            },
            {
                id: 2,
                name: "Player 3",
            },
            {
                id: 3,
                name: "Player 4",
            },
        ];
    }
    const [playerNames, setPlayerNames] = useState(createPlayers());
    const [idForPlayerName, setIdForPlayerName] = useState(5);

    const isThereLessThanTwelvePlayers = playerNames.length < 12;
    const isThereMoreThanFourPlayers = playerNames.length > 4;
    const isThisTheFirstPlayer = (i: number) => i === playerNames[0].id ? true : false;
    const isThisTheLastPlayer = (i: number) => i === playerNames[playerNames.length - 1].id ? true : false;

    function handlePlayerNameChange(e: React.ChangeEvent<HTMLInputElement>, i: number) {
        const copyPlayers = [...playerNames];
        copyPlayers[i].name = e.target.value;
        setPlayerNames(copyPlayers);

    };

    function addPlayerNameClick() {
        const copyPlayers = [...playerNames];
        copyPlayers.push({ id: idForPlayerName, name: `Player ${idForPlayerName}` });
        setIdForPlayerName(idForPlayerName + 1)
        setPlayerNames(copyPlayers);
    };

    function removePlayerNameClick(i: number) {
        const copyPlayers = [...playerNames];
        copyPlayers.splice(i, 1);
        setPlayerNames(copyPlayers);
    };

    function movePlayerDownClick(i: number) {
        const copyPlayers = [...playerNames];
        const elementMoving = copyPlayers.splice(i, 1);
        copyPlayers.splice(i + 1, 0, elementMoving[0]);
        setPlayerNames(copyPlayers);
    };

    function movePlayerUpClick(i: number) {
        const copyPlayers = [...playerNames];
        const elementMoving = copyPlayers.splice(i, 1);
        copyPlayers.splice(i - 1, 0, elementMoving[0]);
        setPlayerNames(copyPlayers);
    };


    return (
        <>
            <div className='settings-players'>
                <h6>PLAYERS</h6>
                <div className='settings-players-names'>
                    {
                        playerNames.map((playerName, i) => {
                            return (
                                <div key={playerName.id} className='settings-player-list'>
                                    <Button size='mini' disabled={!isThereMoreThanFourPlayers} onClick={() => removePlayerNameClick(i)}>
                                        <div className='icon--minus'></div>
                                    </Button>
                                    <input type="text" placeholder={playerName.name} onChange={(e) => handlePlayerNameChange(e, playerName.id)} />
                                    <div className='settings-players-order-buttons'>
                                        <div className='settings-players-order'>
                                            {!isThisTheLastPlayer(playerName.id) && <Button size='mini' onClick={() => movePlayerDownClick(i)}>{<img src={arrowButton} className='down-arrow' />}</Button>}
                                            {!isThisTheFirstPlayer(playerName.id) && <Button size='mini' onClick={() => movePlayerUpClick(i)}>{<img src={arrowButton} className='up-arrow' />}</Button>}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {isThereLessThanTwelvePlayers && <div className='settings-player-add'>
                        <Button size="mini" disabled={!isThereLessThanTwelvePlayers} onClick={() => addPlayerNameClick()}>
                            <div className='icon--plus'></div>
                        </Button>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Settings;