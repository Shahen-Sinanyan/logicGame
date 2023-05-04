import React, { useEffect, useState } from "react";
import { useQuestionsContext } from "../../context/QuestionContext";

export default function ApplePoints() {
  const [applesArray, setApplesArray] = useState([]);
  const { countOfApples } = useQuestionsContext();

  useEffect(() => {
    const arr = [];
    for (let i = 1; i <= 10; i++) {
      if (i <= countOfApples) {
        arr.push({ id: Math.random(), state: "red" });
      } else {
        arr.push({ id: Math.random(), state: "white" });
      }
    }
    setApplesArray(arr);
  }, [countOfApples]);

  return (
    <div>
      <ul>
        {applesArray.map((item, index) => {
          return <span key={item.id} className={item.state}>{index + 1} {item.state}; </span>;
        })}
      </ul>
    </div>
  );
}
