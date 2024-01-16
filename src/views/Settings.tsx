import { useState } from 'react';

function Settings() {
    function createPlayers() {
        return [
            {
                id: '1',
                name: "Player 1",
            },
            {
                id: '2',
                name: "Player 2",
            },
            {
                id: '3',
                name: "Player 3",
            },
            {
                id: '4',
                name: "Player 4",
            },
        ];
    }
    const [playerNames, setPlayerNames] = useState(createPlayers());

    function handlePlayerNameChange(e: React.ChangeEvent<HTMLInputElement>, i: number) {
        const copyPlayers = [...playerNames];
        copyPlayers[i].name = e.target.value;
        setPlayerNames(copyPlayers);
        console.log('This is copyPlayers', copyPlayers[i].name)
        console.log('This is playerNames', playerNames)

    }



    return (
        <>
            <div className='settings-players'>
                <h6>PLAYERS</h6>
                <div className='settings-players-names'>
                    {
                        playerNames.map((playerName, i) => {
                            return (
                                <div key={playerName.id} className='settings-player-list'>
                                    <p>-</p>
                                    <input type="text" id={playerName.id} placeholder={playerName.name} onChange={(e) => handlePlayerNameChange(e, i)} />
                                    <p>⬆⬇</p>
                                </div>
                            )
                        })
                    }
                    <p>➕</p>
                </div>
            </div>
        </>
    )
}

export default Settings;