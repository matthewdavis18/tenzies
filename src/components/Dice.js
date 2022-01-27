export default function Dice(props) {
    return (
        <div className={props.isHeld ? "dice held" : "dice"} onClick={props.holdDice}>{props.value}</div>)
}