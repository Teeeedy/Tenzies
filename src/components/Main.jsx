import Dice from "./Dice";
import { useState } from "react";

export default function Main() {
  const generateRandomDies = () =>
    Array.from({ length: 10 }, () => Math.floor(Math.random() * 6 + 1));

  const [dies, setDies] = useState(generateRandomDies);
  const [isFrozen, setIsFrozen] = useState(Array(10).fill(false));
  const [isWin, setIsWin] = useState(false);

  function handleClick(index) {
    if (isWin) return;

    const newArray = isFrozen.slice();
    newArray[index] = !newArray[index];
    setIsFrozen(newArray);

    if (checkWin()) {
      setIsWin((prev) => !prev);
      return;
    }
  }

  function roll() {
    if (checkWin()) {
      return;
    }

    let randomArray = Array(10);
    for (let i = 0; i < 10; i++) {
      console.log(isFrozen[i]);
      if (!isFrozen[i]) {
        randomArray[i] = Math.floor(Math.random() * 6 + 1);
      } else {
        randomArray[i] = dies[i];
      }
    }
    console.log("rolled");

    setDies(randomArray);
    console.log(randomArray);
  }

  function checkWin() {
    return dies.every((val) => val === dies[0]);
  }

  function reset() {
    setIsWin(false);
    const newFrozen = Array(10).fill(false);
    const newDies = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 6 + 1)
    );
    setIsFrozen(newFrozen);
    setDies(newDies);
  }

  return (
    <main>
      <div className="dice-container">
        {dies.map((die, i) => (
          <Dice
            key={i}
            diceValue={die}
            frozen={isFrozen[i]}
            handleClick={() => handleClick(i)}
          />
        ))}
      </div>
      <div className="button-container">
        <button className="button" onClick={roll}>
          Roll
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>

      {isWin && <div className="win-text">You have won!</div>}
    </main>
  );
}
