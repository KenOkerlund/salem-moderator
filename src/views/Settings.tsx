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



    return (
        <>
            <div className='settings-players'>
                <h6>PLAYERS</h6>
            <div className='settings-players-names'>
                {
                    playerNames.map((playerName) => {
                        return (
                            <input type="text" id={playerName.id} placeholder={playerName.name} />
                        )
                    })
                }
            </div>
            </div>
        </>
    )
}

export default Settings;