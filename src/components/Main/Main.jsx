import React from "react";
import { useQuestionsContext } from "../../context/QuestionContext";
import ModalWindow from "../ModalWindow/ModalWindow";
import Question from "../Question/Question";
import ApplePoints from "../ApplePoints/ApplePoints";

export default function Main() {
  const { randomQuestions, showModalWindow } = useQuestionsContext();
  return (
    <div className="main">
      {showModalWindow && <ModalWindow />}
      <div className="mainChild">
        <ApplePoints />
        {!!randomQuestions.length && !showModalWindow && <Question />}
      </div>
    </div>
  );
}
