import './App.css';
import React from 'react';
import Dice from './components/dice/Dice';
import Score from './components/score/Score';

import Confetti from 'react-confetti';
import { nanoid } from 'nanoid';
export default function App() {
    function generateNewDice() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    function allNewDice() {
        const arr = [];
        for (let i = 0; i < 10; i++) {
            arr.push(generateNewDice());
        }
        return arr;
    }

    function rool() {
        setNewDices(prev => prev.map(dice => {
            return dice.isHeld ? dice : generateNewDice();
        }))
    }

    function hold(id) {
        setNewDices(prev => prev.map(dice => {
            return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
        }))
    }

    function newGame() {
        setNewDices(allNewDice());
        setWinState(false);
        setNewGameState(true);
    }


    const [newDices, setNewDices] = React.useState(() => allNewDice());
    const [winState, setWinState] = React.useState(false);
    const [newGameState, setNewGameState] = React.useState(false);

    React.useEffect(() => {
        const isAllHelld = newDices.every(dice => dice.isHeld);
        const isAllTheSameValue = newDices.every(dice => dice.value === newDices[0].value);
        if (isAllHelld && isAllTheSameValue) {
            setWinState(true);
        }
    }, [newDices]);


    const allNewDicesElements = newDices.map(e => {
        return <Dice
            currentNumber={e.value}
            key={e.id}
            isHeld={e.isHeld}
            id={e.id}
            hold={hold}
        />
    })

    return (
        <>
            {winState && <Confetti />}
            <main className="main">
                <Score winState={winState} newGameState = {newGameState} setNewGameState={setNewGameState}/>
                <h1 className="title">Tenzies</h1>
                <p className="instructions">
                    {winState ? "Congratulations You Win The Game" : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}</p>
                <div className='diceContainer'>
                    {allNewDicesElements}
                </div>
                <button className='rool-btn' onClick={winState ? newGame : rool}>{winState ? "New Game" : "Roll"}</button>
            </main>
        </>
    );
}