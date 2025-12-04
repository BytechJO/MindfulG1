import Q1Image from './assets/Q1.png';
import React, { useState } from 'react';
import '../../shared/Quiz.css';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';
import ValidationAlert from '../../shared/ValidationAlert';
import Timg from '../../../../assets/Gif/Approve.Gif';
import Fimg from '../../../../assets/Gif/False.gif';

export const QuizPage = () => {
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({ q1: null, q2: null, q3: null });
  const [results, setResults] = useState({ q1: null, q2: null, q3: null });
  const [showSkip, setShowSkip] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!answers.q1 || !answers.q2 || !answers.q3) {
      ValidationAlert.info("Incomplete", "Please answer all questions before submitting!");
      return;
    }

    const correctAnswers = { q1: "1", q2: "0", q3: "2" };

    const newResults = {
      q1: answers.q1 === correctAnswers.q1,
      q2: answers.q2 === correctAnswers.q2,
      q3: answers.q3 === correctAnswers.q3
    };

    setResults(newResults);
    setShowSkip(true);

    const score = Object.values(newResults).filter(Boolean).length;
    const totalQuestions = Object.keys(newResults).length;
    const scoreString = `${score}/${totalQuestions}`;

    if (score === totalQuestions) {
      ValidationAlert.success("Good Job!", "", scoreString)
        .then(() => navigate(`/unit/${unitId}/lesson/${lessonId}/feedBack`));
    } else {
      ValidationAlert.error("Try again", "", scoreString);
    }
  };

  const renderAnswerGif = (question, optionValue) => {
    if (results[question] === null) return null;
    if (answers[question] !== optionValue) return null;

    return results[question]
      ? <img src={Timg} alt="correct" className="answer-gif" />
      : <img src={Fimg} alt="wrong" className="answer-gif" />;
  };

  const handleSkip = () => {
    navigate(`/unit/${unitId}/lesson/${lessonId}/feedBack`);
  };

  return (
    <div className="story-pages-container">
      <div className="w-full max-w-6xl">
        <div className="paper animate__animated animate__backInDown" id="p3">
          <img src={Q1Image} alt="Background" className="bg-img" />

          <div className="content">

            {/* Q1 */}
            <div className="Q1">
              <span>Who stood too close to Tom?</span>
              <ul>
                <li>
                  The teacher
                  <input type="radio" name="q1" value="0" onChange={handleChange} />
                  {renderAnswerGif("q1", "0")}
                </li>
                <li>
                  Susan
                  <input type="radio" name="q1" value="1" onChange={handleChange} />
                  {renderAnswerGif("q1", "1")}
                </li>
                <li>
                  Mark
                  <input type="radio" name="q1" value="2" onChange={handleChange} />
                  {renderAnswerGif("q1", "2")}
                </li>
              </ul>
            </div>

            {/* Q2 */}
            <div className="Q2">
              <span>What is personal space like?</span>
              <ul>
                <li>
                  A bubble
                  <input type="radio" name="q2" value="0" onChange={handleChange} />
                  {renderAnswerGif("q2", "0")}
                </li>
                <li>
                  A toy
                  <input type="radio" name="q2" value="1" onChange={handleChange} />
                  {renderAnswerGif("q2", "1")}
                </li>
                <li>
                  A book
                  <input type="radio" name="q2" value="2" onChange={handleChange} />
                  {renderAnswerGif("q2", "2")}
                </li>
              </ul>
            </div>

            {/* Q3 */}
            <div className="Q3">
              <span>What did Susan say to Tom?</span>
              <ul>
                <li>
                  ‘I am angry.’
                  <input type="radio" name="q3" value="0" onChange={handleChange} />
                  {renderAnswerGif("q3", "0")}
                </li>
                <li>
                  ‘I will pop your bubble.’
                  <input type="radio" name="q3" value="1" onChange={handleChange} />
                  {renderAnswerGif("q3", "1")}
                </li>
                <li>
                  ‘I understand about personal space now.’
                  <input type="radio" name="q3" value="2" onChange={handleChange} />
                  {renderAnswerGif("q3", "2")}
                </li>
              </ul>
            </div>

            {/* Submit */}
            <button type="button" id="submitBtn" onClick={handleSubmit}>
              Submit
            </button>

            {/* Skip */}
            {showSkip && (
              <button type="button" className="skip-btn" onClick={handleSkip}>
                Skip
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
