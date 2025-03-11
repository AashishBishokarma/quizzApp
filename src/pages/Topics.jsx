import {Link } from "react-router-dom";
import React from 'react'
import {topics} from '../assets/topics'
import { useNavigate } from "react-router-dom";

const Topics = () => {

  const navigate = useNavigate();

  const handleSelection = (topicId) =>{
    navigate("/quiz",{state:{topicId}}); // passing selected topic to quizpage
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-6">
        Choose a Quiz Topic
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((topic) => (
          <button
            key={topic.id}
            className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition"
            onClick={() => handleSelection(topic.id)}
          >
            {topic.name}
          </button>
        ))}
      </div>

    </div>
  )
}

export default Topics;