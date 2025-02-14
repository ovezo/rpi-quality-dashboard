import { useEffect, useState } from "react";
import { api } from "../../store/api/index";
import { useParams } from "react-router-dom";
import moment from 'moment/moment';
import { convertToLocalTimezone, convertToUTCTimezone, getDateTime } from '../../utils/Utils'

const useFrames = () => {
  
  const [frames, setFrames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultLiveImage, setDefaultLiveImage] = useState("")

  // by default date range is 1 day (last 24 hours)
  const [dateRange, setDateRange] = useState({ 
    startDate: convertToLocalTimezone(getDateTime(1, 'days')),
    endDate: convertToLocalTimezone(getDateTime(0)) 
  })

  const { mac_address } = useParams();
  
  useEffect(() => {
    setIsLoading(true)
    setDefaultLiveImage("")
    setFrames([])
    let url = `?mac_address=${mac_address}`;

    const startDate = convertToUTCTimezone(dateRange.startDate)
    const endDate = convertToUTCTimezone(dateRange.endDate)

    url += `&start_date=${startDate}&end_date=${endDate}`;
    api.get({ url: `detections/frames${url}` }).then((data, err) => {
      if (data.status == 200) {
        setFrames(data.data.map(e => ({...e, created_at: convertToLocalTimezone(e.created_at, 'HH:mm:ss')})));
        if(data.data.length>0){
          setDefaultLiveImage(data.data[0]);
        }else{
          setDefaultLiveImage("");
        }
      }
      setIsLoading(false)
    });

  }, [mac_address, dateRange]);

  return {frames, setFrames, dateRange, setDateRange, defaultLiveImage, convertToLocalTimezone, convertToUTCTimezone, isLoading}
}

export default useFrames;