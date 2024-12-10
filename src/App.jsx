import { useRef, useState } from 'react';

import Phaser from 'phaser';
import { PhaserGame } from './game/PhaserGame';
import Header from './components/Header';
import LiveStatBox from './components/LiveStatBox';
import DashBoard from './components/DashBoard';

function App ()
{
    const phaserRef = useRef();
    const [canMoveSprite, setCanMoveSprite] = useState(true);
    
    // Event emitted from the PhaserGame component
   const currentScene = (scene) => {
       setCanMoveSprite(scene.scene.key !== 'MainMenu');
   }

    return (
        <div id="app">
            <Header/>
            <div className='gameBox'>
                <div className='leftBox'>
                    <LiveStatBox/>
                </div>
                <div className='rightBox'>
                    <div className='phaserBox'><PhaserGame ref={phaserRef} currentActiveScene={currentScene} /></div>
                    <DashBoard/>
                </div>
            </div>
        </div>
    )
}

export default App
