import React, { useContext } from "react";
import DataContext from "../context/dataContext";
import "./quiz.css";

const Quiz = () => {
  const {
    showQuiz,
    question,
    quizs,
    checkAnswer,
    correctAnswer,
    selectedAnswer,
    questionIndex,
    nextQuestion,
    showTheResult,
  } = useContext(DataContext);

  // Check if question is undefined or null before rendering
  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <section
      className="sct"
      style={{ display: `${showQuiz ? "block" : "none"}` }}
    >
      <div className="board">
        <div className="col-lg-8">
          <div className="card">
            <div className="d-flex justify-content-between gap-md-3">
              <h5 className="mb-2 ">{question?.question}</h5>
              <h5 className="qnums">
                {quizs.indexOf(question) + 1} / {quizs?.length}
              </h5>
            </div>
            <div>
              {question?.options?.map((item, index) => (
                <button
                  id="btnopt"
                  key={index}
                  className={`option w-100 text-start btn text-white py-2 px-3 mt-3 rounded  ${
                    correctAnswer === item && "bg-success"
                  }`}
                  onClick={(event) => checkAnswer(event, item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {questionIndex + 1 !== quizs.length ? (
              <button
                id="btr"
                className="btn py-2 "
                onClick={nextQuestion}
                disabled={!selectedAnswer}
              >
                Next Question
              </button>
            ) : (
              <button
                id="btr"
                className="btn py-2  "
                onClick={showTheResult}
                disabled={!selectedAnswer}
              >
                Show Result
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
