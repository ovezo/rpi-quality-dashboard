import { useEffect, useState } from "react";
import { api } from "../../store/api/index";

const useAnalyticsStats = () => {
  const [ statsPerDevice, setStatsPerDevice ] = useState([]);
  const [ statsPerDefect, setStatsPerDefect ] = useState([]);
  const [ counts, setCounts ] = useState({total:0, normal:0});

  const [ dates, setDates ] = useState({start_date: null, end_date: null});
  const [ deviceName, setDeviceName ] = useState("All devices");

  useEffect(() => {
    if (dates.start_date && dates.end_date) {
      let url = `?start_date=${dates.start_date}&end_date=${dates.end_date}T23:59:59`;
      let urlWithoutMinutes = `?start_date=${dates.start_date}&end_date=${dates.end_date}`;
      if (deviceName && deviceName != "All devices") {
        url += `&device_name=${deviceName}`;
      }

      api.get({ url: `stats-per-defect${urlWithoutMinutes}` }).then((data, err) => {
        setStatsPerDefect(data.data);
      });

      api.get({ url: `detections/count${url}` }).then((data, err) => {
        setCounts(data.data);
      });
    }
  }, [dates, deviceName]);

  useEffect(() => {
    if (dates.start_date && dates.end_date) {
      let url = `stats-per-device?start_date=${dates.start_date}&end_date=${dates.end_date}`;

      api.get({ url: url }).then((data, err) => {
        setStatsPerDevice(data.data);
      });
    }
  }, [dates]);

  return {statsPerDefect, statsPerDevice, counts, dates, setDates, deviceName, setDeviceName}
}

export default useAnalyticsStats;