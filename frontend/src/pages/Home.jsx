import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500 ">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-6">
        Welcome to the Quiz App
      </h1>
      <p className="text-lg md:text-xl text-gray-700 text-center mb-4">
        Test your knowledge with fun quizzes!
      </p>
      <Link to="/topics">
        <button className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition">
          Start Quiz
        </button>
      </Link>
    </div>
  );
};

export default Home;
