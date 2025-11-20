import Q1Image from './assets/Q1.png';
import React, { useState } from 'react';
import '../../shared/Quiz.css';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';
import ValidationAlert from '../../shared/ValidationAlert';

export const QuizPage = () => {
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({ q1: null, q2: null, q3: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!answers.q1 || !answers.q2 || !answers.q3) {
      ValidationAlert.info("Incomplete", "Please answer all questions before submitting!");
      return;
    }
    const correctAnswers = { q1: "2", q2: "0", q3: "1" };
    const results = {
      q1: answers.q1 === correctAnswers.q1,
      q2: answers.q2 === correctAnswers.q2,
      q3: answers.q3 === correctAnswers.q3
    };
    const score = Object.values(results).filter(isCorrect => isCorrect).length;
    const totalQuestions = Object.keys(results).length;
    const scoreString = `${score}/${totalQuestions}`;
    const resultsHtml = `
      Q1: ${results.q1 ? '✅ Correct' : '❌ Wrong'}  <br>

      Q2: ${results.q2 ? '✅ Correct' : '❌ Wrong'}  <br>

      Q3: ${results.q3 ? '✅ Correct' : '❌ Wrong'}<br>
      <hr>
      <p><strong>Score:</strong> ${score}/${totalQuestions}</p>
    `;
    if (score === totalQuestions) {
      ValidationAlert.success("Good Job!", "", scoreString)
        .then(() => {
          navigate(`/unit/${unitId}/lesson/${lessonId}/feedBack`);
        });
    } else {
      ValidationAlert.error("Try again", "", scoreString)
    }
  };

  return (
    <div className="story-pages-container">
      <div className="w-full max-w-6xl">
        <div className="paper animate__animated animate__backInDown" id="p3">
          <img src={Q1Image} alt="Background" className="bg-img" />

          <div className="content">
            <div className="Q1">
              <span>Why were the girls arguing?</span>
              <ul>
                <li>They were scared of dinosaurs. <input type="radio" name="q1" value="0" onChange={handleChange} /></li>
                <li>They didn’t like school. <input type="radio" name="q1" value="1" onChange={handleChange} /></li>
                <li>They wanted to play different games.<input type="radio" name="q1" value="2" onChange={handleChange} /></li>
              </ul>
            </div>

            <div className="Q2">
              <span>What game did Bella want to play?</span>
              <ul>
                <li>Dinosaur chase <input type="radio" name="q2" value="0" onChange={handleChange} /></li>
                <li>Hide and seek <input type="radio" name="q2" value="1" onChange={handleChange} /></li>
                <li>Tag <input type="radio" name="q2" value="2" onChange={handleChange} /></li>
              </ul>
            </div>

            <div className="Q3" >
              <span>What did the girls do in the end?</span>
              <ul>
                <li>They fought.<input type="radio" name="q3" value="0" onChange={handleChange} /></li>
                <li>They took turns playing.<input type="radio" name="q3" value="1" onChange={handleChange} /></li>
                <li>They cried.<input type="radio" name="q3" value="2" onChange={handleChange} /></li>
              </ul>
            </div>

            <button type="button" id="submitBtn" onClick={handleSubmit}>Submit</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuizPage;
