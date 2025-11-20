import React, { useState } from 'react';
import StarRating from '../../shared/StarRating.jsx';
import Swal from 'sweetalert2';
import Q2Image from './assets/feedBack.png';
import '../../shared/feedBack.css';

function FeedBack() {

  const handleSubmit = () => {
    Swal.fire({
      icon: 'success',
      title: 'Thank you for rating!',
      text: 'We\'re appreciate it 💜',
      confirmButtonText: 'Done'
    });
  };

  return (
    <div id="p4" className="paper-feedback animate__animated animate__backInDown">
      
      
      <img src={Q2Image} alt="Feedback background" className="feedback-bg-img" />
      
      <div
        className="stars-container absolute left-[47%] transform -translate-x-1/2 flex flex-col gap-12"
        style={{ top: '60%' }}
      >
        <StarRating value={0} />
        <StarRating value={0} />
        <StarRating value={0} />
      </div>

      <button
        type="button"
        id="feedBtn"
        onClick={handleSubmit}
        className="mt-4 px-6 py-3 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all sm:px-4 sm:py-2 absolute transform -translate-x-1/2"
      >
        Finish
      </button>
    </div>
  );
}

export default FeedBack;
