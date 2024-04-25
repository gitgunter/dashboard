import { useEffect, useState } from 'react';

import Play from '../../assets/images/play.svg';
import Pause from '../../assets/images/pause.svg';

import css from './ExamTimer.module.css';

export const ExamTimer = ({ minutes, onTimerEnd, showControls }) => {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimerEnd();
      return;
    }

    const timer = setInterval(() => {
      if (!isPaused) {
        setTimeLeft((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimerEnd, isPaused]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  const handlePauseResume = () => {
    setIsPaused((prevPaused) => !prevPaused);
  };

  return (
    <div className={css.examTimer}>
      <span className={css.timer}>{formatTime(timeLeft)}</span>
      {showControls && (
        <button type='button' className={css.timerControlBtn} onClick={handlePauseResume}>
          {isPaused ? <img src={Pause} /> : <img src={Play} />}
        </button>
      )}
    </div>
  );
};


// import { useEffect, useState, useRef } from 'react';

// import Play from '../../assets/images/play.svg';
// import Pause from '../../assets/images/pause.svg';

// import css from './ExamTimer.module.css';

// export const ExamTimer = ({ minutes, onTimerEnd, showControls }) => {
//   const [timeLeft, setTimeLeft] = useState(minutes * 60);
//   const [isPaused, setIsPaused] = useState(false);
//   const timerRef = useRef(null);

//   // Este useEffect inicia y limpia el temporizador
//   useEffect(() => {
//     const updateTimer = () => {
//       if (!isPaused) {
//         setTimeLeft((prevTime) => prevTime - 1);
//       }
//     };

//     timerRef.current = setInterval(updateTimer, 1000);

//     return () => clearInterval(timerRef.current);
//   }, [isPaused]);

//   // Este useEffect observa timeLeft para detener el examen cuando llega a 0
//   useEffect(() => {
//     if (timeLeft === 0) {
//       onTimerEnd();
//       clearInterval(timerRef.current); // Limpia el temporizador para evitar más actualizaciones
//     }
//   }, [timeLeft, onTimerEnd]);

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes < 10 ? '0' : ''}${minutes}:${
//       seconds < 10 ? '0' : ''
//     }${seconds}`;
//   };

//   const handlePauseResume = () => {
//     setIsPaused((prevPaused) => !prevPaused);
//   };

//   return (
//     <div className={css.examTimer}>
//       <span className={css.timer}>{formatTime(timeLeft)}</span>
//       {showControls && (
//         <button type='button' className={css.timerControlBtn} onClick={handlePauseResume}>
//           {isPaused ? <img src={Pause} alt="Pause" /> : <img src={Play} alt="Play" />}
//         </button>
//       )}
//     </div>
//   );
// };
