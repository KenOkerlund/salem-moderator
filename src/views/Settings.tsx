import { useState } from 'react';
// import Button from '../elements/Button'

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
        // console.log('This is copyPlayers', copyPlayers[i].name)
        // console.log('This is playerNames', playerNames)
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
                                    <button disabled={!isThereMoreThanFourPlayers} onClick={() => removePlayerNameClick(i)} >-</button>
                                    <input type="text" placeholder={playerName.name} onChange={(e) => handlePlayerNameChange(e, i)} />
                                </div>
                            )
                        })
                    }
                    <button type='button' disabled={!isThereLessThanTwelvePlayers} onClick={() => addPlayerNameClick()}>➕</button>
                </div>
            </div>
        </>
    )
}

export default Settings;