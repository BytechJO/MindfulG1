import React from 'react';
import { useNavigate } from 'react-router-dom'; // استيراد useNavigate
import U1 from "../assets/play-btn.svg";

import "./pagetow.css";


const Welcome = () => {
  const navigate = useNavigate(); // تهيئة التنقل

  const goToPtow = () => {
    navigate('/home'); // الانتقال إلى صفحة /ptow
  };

  return (
    <div className='allpa1'>
      <div className="units-container1">
        <div className="unit1">
          <button className="play-button1" onClick={goToPtow}>
            <img src={U1} alt="Unit 1" className="play-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;