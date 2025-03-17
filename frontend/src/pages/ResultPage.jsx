import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || 0; // Get the score from navigation state
  const totalQuestions = location.state?.totalQuestions || 0;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Quiz Completed!</h1>
      <p className="text-xl mt-4">Your Score: {score} / {totalQuestions}</p>

      <button
        className="mt-6 px-5 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate("/")}
      >
        Go to Home
      </button>
    </div>
  );
};

export default ResultPage;
 