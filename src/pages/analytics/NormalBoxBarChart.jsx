import React, { useEffect, useState } from 'react';
import BarChart from '../../charts/BarChart01';
import Tooltip from '../../archive/components/Tooltip';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';
import { data } from 'autoprefixer';
import { useAuth } from '../../context/AuthContext';

function NormalBoxBarChart({stats}) {
  
  const { user } = useAuth()
  const { trackingItem } = user

  const [ chartDatas, setChartDatas ] = useState({labels:[], datasets: []});

  useEffect(() => {
    console.log(stats,"stats");

    let devices = {};
    let dates = [];
    let datasets = [];

    let colors = ['blue', 'orange', 'red', 'indigo', 'green', 'cyan', 'yellow', 'purple']

    for(let stat of stats){
 
      if(devices[stat.device_name]){
        devices[stat.device_name]["data"].push(stat.percentage)
      }else{
        let color = tailwindConfig().theme.colors[colors.pop()]

        devices[stat.device_name] = {
          label: stat.device_name,
          data: [stat.percentage],
          backgroundColor: color[400],
          hoverBackgroundColor: color[500],
          barPercentage: 0.66,
          categoryPercentage: 0.66,
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
    console.log(chartDatas)

  },[stats]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700  flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Percentage of normal {trackingItem}s (%)</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartDatas} width={595} height={248} />
    </div>
  );
}

export default NormalBoxBarChart;
