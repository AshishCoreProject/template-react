import { useContext, useState } from "react";
import { PostContext } from "../context/PostContext";


const BetSection = ()=> {
    const {handleIncreaseScore} = useContext(PostContext)
    const [betMoney, setBetMoney] = useState(10);
    const [placeBet, setPlaceBet] = useState(false);
    const [betLocked, setBetLocked] = useState(false);
    const [cashout, setCashout] = useState(false);
    // const [betLoader, setBetLoader] = useState(false);


    const handleIncrease = () => {
        setBetMoney( ()=> betMoney + 1)
    }

    const handleDecrease = () => {
        setBetMoney( ()=> betMoney - 1)
    }

    const handlePlaceBet = ()=> {
        if(betLocked){
            
        }else{
            setPlaceBet(!placeBet);
        }
        console.log("button is clicked");
        setTimeout(()=> {
            setBetLocked(true);
            // setBetLoader(true)
            console.log("betLocked");
        },5000)
    }

    return (
       <div className="betSection">
            <div className="upperBetSection">
                <div className="flex p-2">
                    <button className="betButton" onClick={handleDecrease}>-</button>
                        <div className="flex items-center">
                            <p className="w-[100px] font-bold text-center text-lg">${betMoney}</p>
                        </div>
                    <button className="betButton" onClick={handleIncreaseScore} >+</button>
                </div>
                <div>
                    <button onClick={handlePlaceBet} style={{background: betLocked? "#FFAF00": ( placeBet? "#FF4545": "#3CCF4E")}} className={ placeBet ? 'placeBetButtonTrue' : 'placeBetButton' }>
                        {betLocked ? "Cash out": (placeBet ? "Cancel": "Place Bet")}
                    </button>
                </div>
            </div>
            {/* <div className="lowerBetSection">
                <p>Autoplay</p> 
            </div> */}
       </div>
    )
}

export default BetSection;
