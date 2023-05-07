import React, { useCallback, useState } from 'react';
import { useQuestionsContext } from '../../context/QuestionContext';
import './style.css';
import girl from '../../image/girl.png'

export default function Question() {
    const {currentQuestion, handleBuble} = useQuestionsContext();
    const [className, setClassName] = useState('baloon');

    const handleAnswer = useCallback((e) => {
        e.stopPropagation();
        setTimeout(() => {
              e.target.className='cloud1';
          }, 500);
        setTimeout(() => {  
              e.target.className='cloud2';
          }, 1000);
        setTimeout(() => {
              e.target.className='cloud3';
          }, 1500);
        setTimeout(() => {
              e.target.className='cloud4';
        }, 2000);
        setTimeout(() => {
            handleBuble(e.target.id)
        },2010)
        
    },[handleBuble, setClassName]);

  return (
    <div className='main-game'>
         <div class='girl'>
                <img src={girl} alt='img'/>
         </div>
        <p className='question'>{currentQuestion?.question}</p>
        <ul className='baloons'>
            {currentQuestion?.answers.map((el, index) => {
                return (
                    <li 
                    key={el.id} 
                    id={el.id} 
                    istrue={String(el.isTrue)}
                    onClick={(e) =>handleAnswer(e) }
                    className={className}
                    >
                        {el.answer } <h3>{''+ el.istrue}</h3>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}
