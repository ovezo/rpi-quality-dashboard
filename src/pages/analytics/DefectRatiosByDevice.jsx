import React, { useEffect, useState } from 'react';
import LineChart from '../../charts/LineChart02';
import Tooltip from '../../archive/components/Tooltip';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';
import { useAuth } from '../../context/AuthContext';

function DefectsByDevice({stats}) {

  const { user } = useAuth()
  const { trackingItem } = user

  const [ chartDatas, setChartDatas ] = useState({
    labels:[], 
    datasets: []
  });

  useEffect(() => {

    let devices = {};
    let dates = [];
    let datasets = [];

    let colors = ['blue', 'orange', 'red', 'indigo', 'green']

    for(let stat of stats){

      let statValue = stat.total / stat.defected_box_count
 
      if(devices[stat.device_name]){
        devices[stat.device_name]["data"].push(statValue)
      }else{
        let color = tailwindConfig().theme.colors[colors.pop()][500]
        devices[stat.device_name] = {
          label: stat.device_name,
          data: [statValue],
          borderColor: color,
          fill: false,
          borderWidth: 2,
          tension: 0,
          pointRadius: 2,
          pointHoverRadius: 4,
          pointBackgroundColor: color,
          pointHoverBackgroundColor: color,
          pointBorderWidth: 0,
          pointHoverBorderWidth: 0,
          clip: 20,
        }
      }

      if(dates.indexOf(stat.date)==-1){
        dates.push(stat.date);
      }

    }

    for(let key of Object.keys(devices)){
      datasets.push(devices[key]);
    }

    setChartDatas({labels: dates, datasets: datasets})

  },[stats]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Total number of {trackingItem}s per fault</h2>
        <Tooltip className="ml-2" size="lg">
          <div className="text-sm">Ratio of total number of {trackingItem}s to defected {trackingItem}s by device</div>
        </Tooltip>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <LineChart data={chartDatas} width={595} height={248} />
    </div>
  );
}

export default DefectsByDevice;
