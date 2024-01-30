import { useState } from 'react';
import Button from '../../elements/Button'

function Settings() {
    function createPlayers() {
        return [
            {
                id: 1,
                name: "Player 1",
            },
            {
                id: 2,
                name: "Player 2",
            },
            {
                id: 3,
                name: "Player 3",
            },
            {
                id: 4,
                name: "Player 4",
            },
        ];
    }
    const [playerNames, setPlayerNames] = useState(createPlayers());
    const [idForPlayerName, setIdForPlayerName] = useState(5);

    const isThereLessThanTwelvePlayers = playerNames.length < 12;
    const isThereMoreThanFourPlayers = playerNames.length > 4;

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
                                    <input type="text" placeholder={playerName.name} onChange={(e) => handlePlayerNameChange(e, i)} />
                                </div>
                            )
                        })
                    }
                    <div className='settings-player-add'>
                        <Button size="mini" disabled={!isThereLessThanTwelvePlayers} onClick={() => addPlayerNameClick()}>
                            <div className='icon--plus'></div>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings;