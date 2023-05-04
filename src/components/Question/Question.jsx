import React, { useCallback } from 'react'
import { useQuestionsContext } from '../../context/QuestionContext'

export default function Question() {
    const {currentQuestion, handleBuble} = useQuestionsContext();

    const handleAnswer = useCallback((e) => {
        handleBuble(e.target.id);
        e.target.style.display = 'none';
    },[handleBuble])
  return (
    <div>
        <p>{currentQuestion?.question}</p>
        <ul>
            {currentQuestion?.answers.map((el, index) => {
                return (
                    <li 
                    key={el.id} 
                    id={el.id} 
                    istrue={String(el.isTrue)}
                    onClick={(e) =>handleAnswer(e) }
                    >
                        {el.answer } <h3>{''+ el.istrue}</h3>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}
