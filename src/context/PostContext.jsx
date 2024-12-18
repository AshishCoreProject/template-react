import { useState, createContext } from "react";
import Options from "../options";
const PostContext = createContext();


function PostProvider({children}){
    const [state, setState] = useState("Ashish");
    const [gameState, setGameState] = useState({
        score: 0,
        playerStatus: 'idle', // 'idle', 'playing', 'paused', etc.
        message: 'Welcome to the game!',
    });
    
    function handleIncreaseScore(){
        setGameState(()=> gameState.score += 1)
    }

    console.log(gameState.score, "updated score");
    return(
        <PostContext.Provider 
            value={{
                state: state,
                gameState : gameState,
                setGameState : setGameState,
                handleIncreaseScore: handleIncreaseScore,
        }}>
            {children}
        </PostContext.Provider>

    )
}
export {PostContext, PostProvider}