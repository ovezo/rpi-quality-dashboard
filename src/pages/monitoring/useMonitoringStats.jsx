import { useEffect, useState } from "react";
import { api } from "../../store/api/index";
import { convertToLocalTimezone, convertToUTCTimezone, getDateTime } from '../../utils/Utils'

const useMonitoringStats = () => {

  const [ statistics, setStatistics ] = useState([]);
  
  // by default date range is 1 day (last 24 hours)
  const [dateRange, setDateRange] = useState({ 
    startDate: convertToLocalTimezone(getDateTime(5, 'hours')),
    endDate: convertToLocalTimezone(getDateTime(0, 'hours'))  
  })

  const [deviceName, setDeviceName] = useState('All')

  useEffect(() => {
   
    let { startDate, endDate } = dateRange

    startDate = convertToUTCTimezone(startDate);
    endDate = convertToUTCTimezone(endDate);

    let url = `?start_date=${startDate}&end_date=${endDate}`;

    if(deviceName && deviceName!="All"){
      url += `&device_name=${deviceName}`;
    }

    api.get({ url: `monitoring${url}` }).then((data, err)=>{
      setStatistics(data.data);
    });

  },[ dateRange, deviceName ]);

  return {statistics, dateRange, setDateRange, deviceName, setDeviceName}
}

export default useMonitoringStats;