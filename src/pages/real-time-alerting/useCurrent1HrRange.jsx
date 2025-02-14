import React, { useState, useEffect } from 'react';
import moment from 'moment';

const useCurrent1HrRange = () => {
  const [current1HrRange, setCurrent1HrRange] = useState("");

  useEffect(() => {
    // Set the initial time immediately
    setCurrent1HrRange(getCurrent1HrRange());

    var intervalId
    setTimeout(()=>{
      setCurrent1HrRange(getCurrent1HrRange());
      intervalId = setInterval(() => {
        setCurrent1HrRange(getCurrent1HrRange());
      }, 60000); // 60000 milliseconds = 1 minute
    }, (60-(new Date()).getSeconds()) * 1000 )

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const getCurrent1HrRange = () => {
    const d = new Date()
    const curHour = formatHrs(d.getHours())
    d.setHours(d.getHours() - 1); // Subtract 1 hour
    const oldHours = formatHrs(d.getHours())
    const minutes = formatHrs(d.getMinutes())

    let theTime = `${oldHours}:${minutes} and ${curHour}:${minutes}`
    return theTime
  }

  const formatHrs = (hr) => hr > 9 ? hr : '0'+hr 
  
  return {current1HrRange}
};

export default useCurrent1HrRange;