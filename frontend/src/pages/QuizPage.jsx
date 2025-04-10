import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { topics } from "../assets/topics";
import {
  htmlQuestions,
  cssQuestions,
  jsQuestions,
  reactQuestions,
  nodejsQuestions,
  mongodbQuestions,
  sqlQuestions,
} from "../assets/questions"; // Import all topic questions

const QuizPage = () => {
  const location = useLocation();
  const selectedTopic = location.state?.topicId;
  const navigate = useNavigate();

  if (!selectedTopic) {
    navigate("/"); // Redirect to home if no topic is selected
    return null;
  }

  const topicQuestions = {
    html: htmlQuestions,
    css: cssQuestions,
    javascript: jsQuestions,
    react: reactQuestions,
    nodejs: nodejsQuestions,
    mongodb: mongodbQuestions,
    sql: sqlQuestions,
  };

  const data = topicQuestions[selectedTopic];

  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [score, setScore] = useState(0);
  let [lock, setLock] = useState(false);
  let [selectedAnswers, setSelectedAnswers] = useState(
    Array(data.length).fill(null)
  );

  useEffect(() => {
    setQuestion(data[index]);
  }, [index, data]);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (!lock) {
      let updatedAnswers = [...selectedAnswers];
      updatedAnswers[index] = ans;
      setSelectedAnswers(updatedAnswers);

      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore(score + 1);
      } else {
        e.target.classList.add("wrong");
        option_array[question.ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const nextQuestion = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
      setLock(selectedAnswers[index + 1] !== null);

      option_array.forEach((option) => {
        option.current.classList.remove("correct", "wrong");
      });

      if (selectedAnswers[index + 1] !== null) {
        let prevSelected = selectedAnswers[index + 1];
        option_array[prevSelected - 1].current.classList.add(
          prevSelected === data[index + 1].ans ? "correct" : "wrong"
        );
        if (prevSelected !== data[index + 1].ans) {
          option_array[data[index + 1].ans - 1].current.classList.add(
            "correct"
          );
        }
      }
    }
  };

  const finishQuiz = () => {
    navigate("/result", { state: { score, totalQuestions: data.length } });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold text-white">
        Quiz - {selectedTopic.toUpperCase()}
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-lg mt-4 w-150">
        <h2 className="my-4 text-xl">
          <span>Q{index + 1}</span>. {question.question}
        </h2>
        <ul className="flex flex-col gap-4 text-left">
          <li
            ref={Option1}
            className="border px-4 py-2 rounded-2xl cursor-pointer"
            onClick={(e) => checkAns(e, 1)}
          >
            {question.option1}
          </li>
          <li
            ref={Option2}
            className="border px-4 py-2 rounded-2xl cursor-pointer"
            onClick={(e) => checkAns(e, 2)}
          >
            {question.option2}
          </li>
          <li
            ref={Option3}
            className="border px-4 py-2 rounded-2xl cursor-pointer"
            onClick={(e) => checkAns(e, 3)}
          >
            {question.option3}
          </li>
          <li
            ref={Option4}
            className="border px-4 py-2 rounded-2xl cursor-pointer"
            onClick={(e) => checkAns(e, 4)}
          >
            {question.option4}
          </li>
        </ul>
        <div className="mt-4 flex justify-between">
          <button
            className={`px-5 py-2 border cursor-pointer ${
              index === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => setIndex(index - 1)}
          >
            Previous
          </button>
          <button
            className="px-5 py-2 border cursor-pointer"
            onClick={index === data.length - 1 ? finishQuiz : nextQuestion}
          >
            {index === data.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
