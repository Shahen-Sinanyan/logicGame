import React, { useCallback, useEffect, useState } from 'react'
import { useQuestionsContext } from '../../context/QuestionContext';
import './style.css'

export default function ModalWindow() {
    const [texts, setTexts] = useState({
        header:{
            start:'Правила игры:',
            end: 'Игра завершена!',
        },
        description: {
            start: 'Будет задан вопрос и несколько вариантов ответа в пузырях. Надо лопнуть лишние пузыри.',
            end: 'Всего вопросов: 10'
        },
        points: 'Правильных ответов: ',
        btn: {
            start: "СТАРТ",
            end: "Закрыть",
            success: "Верно!",
            fail: "Не верно",
          },
    });
    const [currText, setCurrText] = useState({
        btn:'',
        description: '',
        points:'',
        header: '',
    });

    const {getRandomQuestions, randomQuestions, setShowModalWindow, isSuccess, countOfApples,gameOver} = useQuestionsContext();
    useEffect(() => {
        if(!randomQuestions.length) {
            setCurrText({
                btn: texts.btn?.start,
                description: texts.description?.start,
                header: texts.header?.start,
                points:'',
            })
        } else if (gameOver) {
            setCurrText({
                btn: texts.btn?.end,
                description: texts.description?.end,
                points: `${texts.points} ${countOfApples}`,
                header: `${texts.header?.end}`,
            })
        } else if(isSuccess) {
            const value = {
                btn: texts.btn?.success,
                description: '',
                header: '',
                points: '',
            }
            setCurrText(value)
        } else if(!isSuccess) {
            setCurrText({
                btn: texts.btn?.fail,
                description: '',
                header: '',
                points:'',
            })
        }
    },[gameOver, isSuccess])


    const handleBtn = useCallback(() => {
        if(!randomQuestions.length) {
            getRandomQuestions();
            setShowModalWindow(false);
        } else {
            setShowModalWindow(false);
            setShowModalWindow(false);
        }
    },[randomQuestions, getRandomQuestions])

  return (
    <div className='"popup_background'>
        <div className='popup'>
            <h3>{currText.header}</h3>
            <p>{currText.description}</p>
            <p>{currText.points}</p>
            <button onClick={handleBtn}>{currText.btn}</button>
        </div>
    </div>
  )
}
