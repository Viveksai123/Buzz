import React, { useState, useEffect } from 'react';
import "animate.css";
import { useNavigate } from 'react-router-dom';
import './styles/Level1Page.css'; // Ensure this path is correct
import Level1Img from './images/1267912.jpg';
import Img from './images/img.png';
import LeftImage from './images/SATARCLEFTIMAGE.png'; // Import the image for the left side
import ParticlesComponent from '../components/ParticlesComponent'; 
import { FaClock, FaPaperPlane, FaStar } from 'react-icons/fa'; // Import icons
import { GiLightningStorm } from 'react-icons/gi'; // Example import
import CryptoJS from 'crypto-js';

const Levelone = () => {
  const navigate = useNavigate();
  const [time, setTime] = useState(1800); // 30 minutes in seconds
  const [submittedAnswer, setSubmittedAnswer] = useState('');
  const [response, setResponse] = useState('');
  const [validationResult, setValidationResult] = useState('');
  const [castSpellAnswer, setCastSpellAnswer] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccessPopupVisible, setSuccessPopupVisible] = useState(false);
  const [isSpellValidated, setIsSpellValidated] = useState(false);
  const totalLevels = 8;
  const currentLevel = 1; // Set current level directly as a constant

  // Example hash (replace this with your actual hash)
  const hashedPassword = 'ec28e6094c3c7d86adabcf28217b224084d9097d234852dee4b560b6ea79582b'; // Example SHA-256 hash

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      // Send the submitted answer to the backend
      const res = await fetch('http://4.242.100.105/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: password }),
      });

      const data = await res.json();
      setResponse(data.response);

    } catch (error) {
      console.error('An error occurred:', error);
      setResponse('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = () => {
    try {
      const submittedAnswerHash = CryptoJS.SHA256(submittedAnswer).toString();
      if (submittedAnswerHash === hashedPassword) {
        setValidationResult('Correct! Now cast the spell.');
        setSuccessPopupVisible(true);
      } else {
        setValidationResult('Incorrect. Try again.');
        setSuccessPopupVisible(false);
      }
    } catch (error) {
      console.error('Error validating the answer:', error);
      setSuccessPopupVisible(false);
      setValidationResult('An error occurred.');
    }
  };

  const handleCastSpell = () => {
    const dummyPassword = 'Firewall'; // Dummy password for testing
    if (castSpellAnswer === dummyPassword) {
      setIsSpellValidated(true); // Spell validated successfully
    } else {
      alert('Incorrect password for casting spell. Try again.');
    }
  };

  const handleNextLevel = () => {
    navigate(`/level${currentLevel + 1}`);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleValidate()
    }
  };

  const progressPercentage = (currentLevel / totalLevels) * 90; // Adjust progress percentage calculation

  return (
    <div className="level1-page">
      <ParticlesComponent id="tsparticles" />
      <div className="content-container">
        <div className="left-side animate__animated animate__backInDown">
          <img src={LeftImage} alt="Left Side" className="left-image" />
        </div>
        <div className="center-container">
          <div className="bordered-container">
            <div className="container">
              <div className="level-header animate__animated animate__backInRight">
                <span className="level-indicator">You Are In LEVEL 1</span>
              </div>
              <p className="instruction-text animate__animated animate__backInLeft">
                Your goal is to make Master reveal the secret password for each level. However, Master will upgrade the defenses after each successful password guess!
              </p>
              <div className="levels-progress animate__animated animate__backInRight">
                <p className="levels-passed">Levels Passed: {currentLevel - 1} / {totalLevels}</p>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                </div>
              </div>
              <div className="image-section">
                <img src={Level1Img} alt="Expecto Patronum" className='animate__animated animate__bounce'/>
                <p className='animate__animated animate__backInLeft'>I am happy to reveal the password.</p>
              </div>
              <div className="password-section">
                <div className="input-wrapper animate__animated animate__fadeInUpBig">
                  <textarea
                    className="password-input"
                    placeholder="Enter your prompt here"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <FaPaperPlane onClick={handleSubmit} className="submit-icon" />
                </div>
                <p className="response-text">{response}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="right-side animate__animated animate__fadeInBottomRight" style={{ marginTop: '150px' }}>
            <div className="timer">
              <FaClock className="clock-icon" />
              {formatTime(time)}
            </div>
          <div className="validation-section">
            <p style={{ marginBottom: '10px' }}>Validate the spell 1:</p>
            <div className="input-wrapper1">
              <div className='childinputwrap'>
              <input
                type="text"
                value={submittedAnswer}
                onChange={(e) => setSubmittedAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <GiLightningStorm onClick={handleValidate} className="validate-icon" />
              </div>
              <div><p className="validation-text">{validationResult}</p></div>
            </div>
          </div>
        </div>
      </div>
      {isSuccessPopupVisible && (
        <div className="success-popup animate__animated animate__fadeInDownBig">
          <div className="popup-content">
          <h1 className='heading animate__animated animate__fadeInUpBig' style={{color:"green"}}>Congratulations!</h1>
            
            {isSpellValidated ? (
              <div>
                <div className="stars  animate__animated animate__fadeInLeft">
              <FaStar className="star-icon" />
              <FaStar className="star-icon center" />
              <FaStar className="star-icon" />
            </div>
                <p className=' animate__animated animate__fadeInRight'>You have successfully cast the spell. Here’s to learning a new one!</p>
                <button className=" animate__animated animate__fadeInDownBig" onClick={handleNextLevel}>Next Level</button>
              </div>
            ) : (
              <div className='column'>
                <img src={Img} alt="hat" className='photo  animate__animated animate__fadeInLeft' />
                <h1 className='heading  animate__animated animate__fadeInRight' style={{color:"red"}}>"Firewall"</h1>
                <h1 className="level-indicator  animate__animated animate__fadeInLeft">Cast the spell to proceed:</h1>
                
                <p className=' animate__animated animate__fadeInRight'> A security device or software that monitors and controls incoming and outgoing network traffic based on predetermined security rules. It acts as a barrier between a trusted internal network and untrusted external networks.</p>
                
                <br/>
                <div className="input-wrapper1">
                <div className='input-wrapper'>
                   
                  <input
                  className="password-input"
                    type="text"
                    value={castSpellAnswer}
                    onChange={(e) => setCastSpellAnswer(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <GiLightningStorm onClick={handleCastSpell} className="cast-spell-icon" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Levelone;
