import { useState, useEffect } from 'react';

function useClock(timezone = 'local') {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const adjustedTime =
    timezone === 'local'
      ? time
      : new Date(time.toLocaleString('en-US', { timeZone: timezone }));

  return adjustedTime;
}

export default useClock;


// import { useState, useEffect } from 'react';
// import dayjs from 'dayjs';

// function useClock(timezone = 'local') {
//   const [currentTime, setCurrentTime] = useState(dayjs.locale('es'));

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(dayjs());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   // const adjustedTime =
//     // timezone === 'local' ? currentTime : dayjs().tz(currentTime, timezone);

//   return currentTime;
// }

// export default useClock;
