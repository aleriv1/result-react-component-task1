import { useState } from "react";
import "./App.css";
import styles from "./App.module.css";

function App() {
  const [calcShow, setCalcShow] = useState("0");
  const [resultFixed, setResultFixed] = useState(false);

  const buttons = [];
  for (let i = 1; i <= 9; i++) {
    buttons.push(String(i));
  }
  buttons.push("0");
  buttons.push("+");
  buttons.push("-");
  buttons.push("c");
  buttons.push("=");

  function calculate(expression) {
    if (!expression || expression === "0") return 0;

    const matches = expression.match(/[+-]?\d+/g) || [];
    return matches.reduce((sum, num) => sum + Number(num), 0);
  }

  let resCalc = calculate(calcShow);

  function handleClick(number) {
    if (number === "c") {
      setCalcShow("0");
      setResultFixed(false);
      return;
    }

    if (number === "=") {
      setCalcShow(String(resCalc));
      setResultFixed(true);
      return;
    }

    if (calcShow === "0" && number !== "+" && number !== "-") {
      setCalcShow(number);
      setResultFixed(false);
      return;
    }

    const lastChar = calcShow[calcShow.length - 1];
    if (/[+-]/.test(lastChar) && !/^\d$/.test(number)) {
      return;
    }

    setCalcShow((v) => v + number);
    setResultFixed(false);
  }

  return (
    <>
      <p
        className={`${styles["calc-display"]} ${resultFixed ? styles["calc-display-fixed"] : ""}`}
      >
        {calcShow}
      </p>

      <p className={styles["res-display"]}>{resCalc}</p>

      <div className={styles.numbers}>
        {buttons.map((number) => (
          <button key={number} onClick={() => handleClick(number)}>
            {number}
          </button>
        ))}
      </div>
    </>
  );
}

export default App;
