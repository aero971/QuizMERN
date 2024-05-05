import React, { useContext } from 'react';
import DataContext from '../context/dataContext';
import './result.css'

const Result = () => {
    const { showResult, quizs, marks, startOver }  = useContext(DataContext);
    return (
        <section  id='rsl' style={{ display: `${showResult ? 'block' : 'none'}` }}>
            <div className="container">
                <div className="bord">
                
                    <div className="col-lg-6">
                    <div className={`result-bord ${marks > (quizs.length * 5) ? 'custom-bg-success' : 'custom-bg-danger'}`}>
                            <h1 className='mb-2 fw-bold'>{marks > (quizs.length * 5) ? 'Fantastic!' : 'Uh-oh!'}</h1>
                            <h3 className='mb-3 fw-bold'>Your score is {marks} out of {quizs.length * 10}</h3>

                            <button onClick={startOver} className='btn py-2 px-4 btn-light fw-bold d-inline'>Play Again</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Result;