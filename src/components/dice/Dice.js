import './Dice.css';
import { nanoid } from 'nanoid';
export default function (props) {
    const styles = { backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF" };
    const dotes = [];
    for (let index = 0; index < props.currentNumber; index++) {
        dotes.push(<span className="dote" key={nanoid()}></span>)
    }
    return (
        <div style={styles} className="dice" onClick={() => props.hold(props.id)}>
            {dotes}
        </div>
    );
}