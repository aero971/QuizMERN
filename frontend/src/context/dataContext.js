import { createContext, useState, useEffect } from "react";
import axios from 'axios';


const DataContext = createContext({});

export const DataProvider = ({children}) => {
    // State variables for quiz data
    const [quizs, setQuizs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State variables for managing quiz
    const [question, setQuestion] = useState({});
    const [questionIndex, setQuestionIndex] = useState(0);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [marks, setMarks] = useState(0);
    const [showStart, setShowStart] = useState(true);
    const [showQuiz, setShowQuiz] = useState(false);
    const [showResult, setShowResult] = useState(false);

    // Function to fetch quiz data from the database
    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/quiz');
                const allQuestions = response.data;
                // Shuffle the array of questions
                const shuffledQuestions = shuffleArray(allQuestions);
                // Select the first 10 questions
                const selectedQuestions = shuffledQuestions.slice(0, 10);
                setQuizs(selectedQuestions);
                setQuestion(selectedQuestions[0]); // Set the first question initially
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchQuizData();
    }, []);

    // Function to shuffle an array
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // Start Quiz
    const startQuiz = () => {
        setShowStart(false);
        setShowQuiz(true);
    }

    // Check Answer
    const checkAnswer = (event, selected) => {
        if (!selectedAnswer) {
            setCorrectAnswer(question.answer);
            setSelectedAnswer(selected);

            if (selected === question.answer) {
                event.target.classList.add('bg-success');
                setMarks(marks + 10);
            } else {
                event.target.classList.add('bg-danger');
            }
        }
    }

    // Next Question
    const nextQuestion = () => {
        setCorrectAnswer('');
        setSelectedAnswer('');
        const wrongBtn = document.querySelector('button.bg-danger');
        wrongBtn?.classList.remove('bg-danger');
        const rightBtn = document.querySelector('button.bg-success');
        rightBtn?.classList.remove('bg-success');
        // Increment questionIndex
        setQuestionIndex(prevIndex => prevIndex + 1);
        // Update question with the next question from quizs array
        setQuestion(quizs[questionIndex + 1]);
    }

    // Show Result
    const showTheResult = () => {
        setShowResult(true);
        setShowStart(false);
        setShowQuiz(false);
    }

    // Start Over
    const startOver = () => {
        setShowStart(false);
        setShowResult(false);
        setShowQuiz(true);
        setCorrectAnswer('');
        setSelectedAnswer('');
        setQuestionIndex(0);
        setMarks(0);
        const wrongBtn = document.querySelector('button.bg-danger');
        wrongBtn?.classList.remove('bg-danger');
        const rightBtn = document.querySelector('button.bg-success');
        rightBtn?.classList.remove('bg-success');
    }

    return (
        <DataContext.Provider value={{
            startQuiz, showStart, showQuiz, question, quizs, checkAnswer, correctAnswer,
            selectedAnswer, questionIndex, nextQuestion, showTheResult, showResult, marks,
            startOver, loading, error
        }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;
