import React, { useEffect, useState } from 'react';
import LineChart from '../../charts/LineChart02';
import Tooltip from '../../archive/components/Tooltip';

// Import utilities
import { tailwindConfig, defectRelabeling } from '../../utils/Utils';

function DefectsByType({stats, deviceName}) {

  const [ chartDatas, setChartDatas ] = useState({
    labels:[], 
    datasets: []
  });

  useEffect(() => {
    let defects = {
      "normal":{
        label: "Normal",
        data: [],
        borderColor: tailwindConfig().theme.colors.emerald[500],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 2,
        pointHoverRadius: 4,
        pointBackgroundColor: tailwindConfig().theme.colors.emerald[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.emerald[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      },
      "defected":{
        label: "Defected",
        data: [],
        borderColor: tailwindConfig().theme.colors.blue[500],
        fill: false,
        borderWidth: 2,
        tension: 0,
        pointRadius: 2,
        pointHoverRadius: 4,
        pointBackgroundColor: tailwindConfig().theme.colors.blue[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
      }
    };

    let dates = [];
    let datasets = [];

    for(let stat of stats){
 
      defects["A"]["data"].push(stat["A"]);
      defects["B"]["data"].push(stat["B"]);
      defects["C"]["data"].push(stat["C"]);
      defects["D"]["data"].push(stat["D"]);
      defects["E"]["data"].push(stat["E"]);
      defects["F"]["data"].push(stat["F"]);
      defects["unpacked_box"]["data"].push(stat["unpacked_box"]);

      dates.push(stat.date);

    }

    for(let key of Object.keys(defects)){
      datasets.push(defects[key]);
    }

    setChartDatas({labels: dates, datasets: datasets})

  },[stats]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Number of defects for {deviceName === 'All'? 'all cameras' : deviceName}</h2>
      </header>
      {/* Change the height attribute to adjust the chart height */}
      <LineChart data={chartDatas} width={595} height={248} />
    </div>
  );
}

export default DefectsByType;
