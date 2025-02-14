import React, { useEffect, useState } from 'react';
import LineChart from '../../charts/LineChart02';
import Tooltip from '../../archive/components/Tooltip';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DefectsByDevice({stats}) {
  const [ chartDatas, setChartDatas ] = useState({
    labels:[], 
    datasets: []
  });

  // restructures given stats data to the required format by LineChart component
  useEffect(() => {
    let devices = {};
    let dates = [];
    let datasets = [];

    let colors = ['blue', 'orange', 'red', 'indigo', 'green']

    for(let stat of stats){

      let statValue = stat.defected_box_count
 
      if(devices[stat.device_name]){
        devices[stat.device_name]["data"].push(statValue)
      }else{
        let color = tailwindConfig().theme.colors[colors.pop()][500]
        devices[stat.device_name] = {
          ...getDefaultDatasetAttr(color),
          label: stat.device_name,
          data: [statValue],
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
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Number of defects by device</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <LineChart data={chartDatas} width={595} height={248} />
    </div>
  );
}

export default DefectsByDevice;

// the style attribute for Component Line Chart
const getDefaultDatasetAttr = (color) => ({
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
})
