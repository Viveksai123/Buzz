import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Timestamp.css'; // Import the CSS file

function Timestamp({ timeLeft }) {
  const navigate = useNavigate();

  const goToLeaderboard = () => {
    navigate('/leaderboard');
  };

  return (
    <div className="popup-content">
      <h1>Time is up!</h1>
      <p>Your remaining time: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
      <button onClick={goToLeaderboard}>Go to Leaderboard</button>
    </div>
  );
}

export default Timestamp;
