import React, { useEffect, useState } from "react";
import { useQuestionsContext } from "../../context/QuestionContext";
import apple1 from '../../image/apple1.png';
import apple2 from '../../image/apple2.png';

import './style.css';


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
    <div className="game_header">
      <ul className="appleList">
        {applesArray.map((item, index) => {
          return(
            <div key={item.id} className={"apple"}>
              <img className='appleImg' src={item.state === 'red'? apple1: apple2}/>
            </div>
          ) 
       })}
      </ul>
    </div>
  );
}
