import './Score.css';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
export default function Score(props) {
    const [bestTime, setBestTime] = useState(localStorage.getItem("bestTime") === null ? 0 : parseInt(localStorage.getItem("bestTime")));
    const [time, setTime] = useState(0);

    // for increase timer
    useEffect(() => {
        const interval = setInterval(() => {
            if(props.newGameState){
                setTime(0);
                props.setNewGameState(false);
            }

            if (props.winState) {
                return null;
            }
            setTime(prevTime => prevTime + 1);

        }, 1000);
        return () => clearInterval(interval);
    }, [props.winState , props.newGameState])

    const firstRender = useRef(true);
    useEffect(() => {
        // to check if this is first render
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        if (props.winState && (bestTime > time || bestTime === 0)) {
            localStorage.setItem("bestTime", `${time} `);
            setBestTime(time);
        }
    }, [props.winState])


    return (
        <div className='scoreBar'>
            <p className='time'>Time : {time}</p>
            <p className='best-time'>Best time : {bestTime}</p>
        </div>
    );
}