import Dice from './Dice';
import React from 'react';
import Confetti from 'react-confetti'




export default function Game() {
    const [tenzies, setTenzies] = React.useState(false);
    const [diceNums, setDiceNums] = React.useState(allNewDice())

    React.useEffect(() => {
        let holds = diceNums.filter(dice => dice.isHeld);

        if (holds.length === 10) {
            let value = holds[0].value;
            let winner = []
            diceNums.forEach(dice => {
                if (dice.value === value) {
                    winner.push(dice.value)
                    if (winner.length === 10) {
                        setTenzies(true)
                        console.log('you win')
                    }

                }
            })
        } else { setTenzies(false) }

    }, [diceNums])





    function holdDice(id) {
        setDiceNums(oldDice => oldDice.map(die => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        }))
    }



    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: i
            })
        }
        return newDice
    }

    const gameValues = diceNums.map((die, i) => {
        return <Dice value={die.value} key={i} id={i} isHeld={die.isHeld} holdDice={() => holdDice(i)} />
    })

    function handleClick(event) {
        if (tenzies) { setDiceNums(allNewDice()) } else {
            setDiceNums(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    { ...die, value: Math.ceil(Math.random() * 6) }
            }))
        }

    }

    return (
        <div className='main'>
            {tenzies ? <Confetti /> : null}
            <div className='info'>   <h1>Tenzies</h1>
                <p className='insructions'> Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p></div>
            <div className='gameBoard'>
                {gameValues}
            </div>
            <button className='rollButton' onClick={handleClick}>{tenzies ? "New Game" : "Roll"}</button>
        </div >)
}