import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import data from '../initialData.json';

const initialData = {
    gameOver: false,
    isSuccess: true,
    handleBuble:() => undefined,
    countOfApples: 10,
    showModalWindow: true,
    setShowModalWindow: () => undefined,
    currentQuestion: {},
    getRandomQuestions: [],
};

const QuestionsContext = createContext(initialData);

export function QuestionsContextProvider ({children}) {
    const [questions, setQuestions] = useState([]); 
    const [randomQuestions, setRandomQuestions] = useState([]);
    const [countOfApples, setCountOfApples] = useState(10);
    
    const [countOfFalse, setCountOfFalse] = useState(0);
    const [currIndex, setCurrIndex] = useState(0);
    const [isSuccess, setIsSuccess] = useState(true);
    const [showModalWindow, setShowModalWindow] = useState(true);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        async function getData () {
           const fetchedQuestion = await data; // all data fetching function imitation
           setQuestions(fetchedQuestion);
        };
        getData();
    },[]);

    const currentQuestion = useMemo(() => {
        return randomQuestions[currIndex];
    },[randomQuestions, currIndex]);

    const calcFalsyAnswers = useMemo(() => {
        let count = 0;
        currentQuestion?.answers.forEach(answer => {
            if(!answer.istrue) {
                count++;
            }
        });
        return count;
    }, [currentQuestion]);

    useEffect(() => {
        if((calcFalsyAnswers !== 0) && (calcFalsyAnswers - countOfFalse === 0)) {
            setIsSuccess(prev => true);
            setCurrIndex(currIndex + 1);
            setShowModalWindow(true);
        }
    },[countOfFalse]);

    useEffect(() =>{
        setCountOfFalse(0);
    },[currIndex]);

    useEffect(() => {
        if ((currIndex === 10)) {
            setGameOver(true);
            setShowModalWindow(true);
        }
    },[currIndex, calcFalsyAnswers]);

    const getRandomQuestions = useCallback(() => {
        let result = questions.sort(()=> Math.random() - 0.5).splice(0, 10);
        setRandomQuestions(result);
    },[questions, setRandomQuestions]); 

    const handleBuble = useCallback((id) => {
        currentQuestion.answers.forEach(answer => {
            if(answer.id === +id) {
                if(!answer.istrue) {
                    setCountOfFalse(countOfFalse+1);
                } else {
                    setCurrIndex(currIndex+1);
                    setIsSuccess(prev => false);
                    setShowModalWindow(true);
                    setCountOfApples(countOfApples - 1);
                }
            }
        })
    },[
        currentQuestion,
         setCountOfFalse, 
         countOfFalse,
         setIsSuccess,
          setCurrIndex,
           currIndex,
           setShowModalWindow,
           setCountOfApples,
           countOfApples,
        ]);
 
    return(
        <QuestionsContext.Provider 
            value={{
                gameOver,
                isSuccess,
                handleBuble,
                countOfApples,
                randomQuestions,
                showModalWindow,
                currentQuestion,
                setShowModalWindow,
                getRandomQuestions,
            }}
        >
            {children}
        </QuestionsContext.Provider>
    )
};

export function useQuestionsContext () {
    return useContext(QuestionsContext);
}


