import { useState } from 'react';

function Settings() {
    const [playerNames, setPlayerNames] = useState([
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
    ])

    return (
        <input type="text" placeholder={playerNames[0].name}/>
    )
}

export default Settings;