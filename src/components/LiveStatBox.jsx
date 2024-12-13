import { useContext } from "react";
import { PostContext } from "../context/PostContext";

const LiveStatBox = ()=> {
    const {gameState} = useContext(PostContext);
    console.log(gameState);
    return (
        <div>
            <div className='livestatbox'>
                <div className="text-xl flex justify-between text-right h-8 px-4 bg-[#FF5F00]">
                    <p>{gameState.score}</p>
                    <p>Ashish</p>
                </div>
                <div className="statsHeader rounded-b-lg"></div>
                <div className="statsBody"></div>
            </div>
        </div>
    )
}

export default LiveStatBox;