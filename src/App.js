import logo from './logo.svg';
import './App.css';
import Main from './components/Main/Main';


import {QuestionsContextProvider} from './context/QuestionContext';

function App() {
  return (
    <QuestionsContextProvider>
      <Main />
    </QuestionsContextProvider>
  );
}

export default App;
