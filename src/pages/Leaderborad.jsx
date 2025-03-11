import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/leaderboard").then((response) => {
      setLeaderboard(response.data);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      <table className="border-collapse border border-gray-400 w-1/2 text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Rank</th>
            <th className="border px-4 py-2">Nickname</th>
            <th className="border px-4 py-2">Score</th>
            <th className="border px-4 py-2">Time (s)</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((player, index) => (
            <tr key={index} className="bg-white">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{player.nickname}</td>
              <td className="border px-4 py-2">{player.score}</td>
              <td className="border px-4 py-2">{player.timeTaken}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
