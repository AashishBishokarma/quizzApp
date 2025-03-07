import React, { useState, useRef ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { data } from "../assets/data";

const QuizPage = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [selectedAnswers, setSelectedAnswers] = useState(Array(data.length).fill(null)); // Stores selected answers
  useEffect(() => {
    console.log("Score updated:", score);
  }, [score]);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);
  
  let option_array = [Option1, Option2, Option3, Option4];

  const navigate = useNavigate();

  const checkAns = (e, ans) => {
    if (!lock) {
      let updatedAnswers = [...selectedAnswers]; 
      updatedAnswers[index] = ans; // Store the selected answer5
      
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
      setQuestion(data[index + 1]);
      setLock(selectedAnswers[index + 1] !== null); // Lock only if an answer was selected

      if(index = data.length - 1){
        
      }

      // Remove styles only if no previous answer exists
      option_array.forEach((option) => {
        option.current.classList.remove("correct", "wrong");
      });

      // Restore previously selected answer (if any)
      if (selectedAnswers[index + 1] !== null) {
        let prevSelected = selectedAnswers[index + 1];
        option_array[prevSelected - 1].current.classList.add(
          prevSelected === data[index + 1].ans ? "correct" : "wrong"
        );
        if (prevSelected !== data[index + 1].ans) {
          option_array[data[index + 1].ans - 1].current.classList.add("correct");
        }
      }
    }
  };

  const prevQuestion = () => {
    if (index > 0) {
      setIndex(index - 1);
      setQuestion(data[index - 1]);
      setLock(selectedAnswers[index - 1] !== null); // Lock only if an answer was selected

      // Restore previously selected answer (if any)
      option_array.forEach((option) => {
        option.current.classList.remove("correct", "wrong");
      });

      if (selectedAnswers[index - 1] !== null) {
        let prevSelected = selectedAnswers[index - 1];
        option_array[prevSelected - 1].current.classList.add(
          prevSelected === data[index - 1].ans ? "correct" : "wrong"
        );
        if (prevSelected !== data[index - 1].ans) {
          option_array[data[index - 1].ans - 1].current.classList.add("correct");
        }
      }
    }
  };

  const finishQuiz = () => {
    navigate("/result", { state: { score, totalQuestions: data.length } }); // Redirects with score data
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Quiz Page</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg mt-4 w-150">
        <h2 className="my-4 text-xl">
          <span>Q{index + 1}</span>. {question.question}
        </h2>
        <ul className="flex flex-col gap-4 text-left">
          <li ref={Option1} className="border px-4 py-2 rounded-2xl" onClick={(e) => checkAns(e, 1)}>
            {question.option1}
          </li>
          <li ref={Option2} className="border px-4 py-2 rounded-2xl" onClick={(e) => checkAns(e, 2)}>
            {question.option2}
          </li>
          <li ref={Option3} className="border px-4 py-2 rounded-2xl" onClick={(e) => checkAns(e, 3)}>
            {question.option3}
          </li>
          <li ref={Option4} className="border px-4 py-2 rounded-2xl" onClick={(e) => checkAns(e, 4)}>
            {question.option4}
          </li>
        </ul>
        <div className="mt-4 flex justify-between">
          <button
            className={`px-5 py-2 border ${index === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={prevQuestion}
          >
            Previous
          </button>
          <button
            className={`px-5 py-2 border ${index === data.length - 1 ? "bg-purple-500 text-white" : ""}`}
            onClick={index === data.length - 1 ? finishQuiz : nextQuestion}
          >
            {index === data.length - 1 ? "Finish" : "Next"}
          </button>
        </div>

        <hr className="mt-10 mb-5"></hr>

        <div className="index">
          {index + 1} out of {data.length}
        </div>

        
      </div>
    </div>
  );
};

export default QuizPage;
