import React, { useContext } from "react";
import DataContext from "../context/dataContext";
import "./start.css";

const Start = () => {
  const { startQuiz, showStart } = useContext(DataContext);
  return (
    <section
      className="text-white text-center"
      id="cms"
      style={{ display: `${showStart ? "block" : "none"}` }}
    >
      <div className="container">
        <div
          className="row vh-80 align-items-center justify-content-center"
          id="brd"
        >
          <div className="col-lg-8">
            <div class="title-wrapper">
              <h1 class="sweet-title">
                <span data-text="IPL Quiz">IPL Quiz</span>
              </h1>
            </div>

            <h1 className="title-tag" id="txt">
              How Well Do You Know IPL? lets Unleash Your IPL Knowledge!
            </h1>
            <button onClick={startQuiz} className="button-17" id="btn">
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Start;
