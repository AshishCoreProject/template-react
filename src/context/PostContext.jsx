import { useState, createContext } from "react";
import Options from "../options";
const PostContext = createContext();


function PostProvider({children}){
    const [playerHealth, setPlayerHealth] = useState(100);
    const [gameState, setGameState] = useState({
        score: 0,
        playerStatus: 'idle', // 'idle', 'playing', 'paused', etc.
        message: 'Welcome to the game!',
    });
    
    function handleIncreaseScore(){
        gameState.score += 1;
        Options.defaultBalance +=1
        console.log(Options.defaultBalance, "default balance");
        setPlayerHealth(()=> playerHealth + 1)
    }

    console.log(gameState.score, "updated score");
    return(
        <PostContext.Provider 
            value={{
                playerHealth:playerHealth,
                setPlayerHealth: setPlayerHealth,
                gameState : gameState,
                setGameState : setGameState,
                handleIncreaseScore: handleIncreaseScore,
        }}>
            {children}
        </PostContext.Provider>

    )
}
export {PostContext, PostProvider}