import React, { useCallback, useState } from 'react';
import { useQuestionsContext } from '../../context/QuestionContext';

export default function Question() {
    const {currentQuestion, handleBuble} = useQuestionsContext();
    const [className, setClassName] = useState('initial-cloud');

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
    <div className='questionFrame'>
        <p>{currentQuestion?.question}</p>
        <ul className='questionList'>
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
