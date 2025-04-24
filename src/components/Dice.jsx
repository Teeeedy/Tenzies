export default function Dice({ diceValue, frozen, handleClick }) {
  return (
    <button onClick={handleClick} className={`dice ${frozen ? "clicked" : ""}`}>
      {diceValue}
    </button>
  );
}
