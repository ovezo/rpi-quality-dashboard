import React, { useEffect, useState } from 'react';
import LineChart from '../../charts/LineChartTime';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';


function DeviceMonitoring({stats, deviceName}) {

  const [ chartDatas, setChartDatas ] = useState({
    labels:[], 
    datasets: []
  });

  // restructuring the stats data
  useEffect(() => {
    let datasets = [
      {
        ...getDefaultDatasetAttrs(tailwindConfig().theme.colors.red[500]),
        label: "Temperature (°C)",
        data: stats.map(e => e.temperature)
      },
      {
        ...getDefaultDatasetAttrs(tailwindConfig().theme.colors.indigo[500]),
        label: "CPU (%)", 
        data: stats.map(e => e.cpu)
      },
      {
        ...getDefaultDatasetAttrs(tailwindConfig().theme.colors.sky[500]),
        label: "Storage (%)",
        data: stats.map(e => e.storage)
      },
      {
        ...getDefaultDatasetAttrs(tailwindConfig().theme.colors.purple[500]),
        label: "RAM (%)", 
        data: stats.map(e => e.ram)
      }
    ];

    let labels = stats.map(stat => stat.created_at);

    setChartDatas({labels, datasets})

  },[stats]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Monitoring {deviceName}</h2>
      </header>
      {/* Change the height attribute to adjust the chart height */}
      <LineChart data={chartDatas} width={595} height={248} />
    </div>
  );
}

export default DeviceMonitoring;

// the style attribute for Component Line Chart
const getDefaultDatasetAttrs = (color) => ({
  borderColor: color,
  fill: false,
  borderWidth: 2,
  tension: 0,
  pointRadius: 0,
  pointHoverRadius: 3,
  pointBackgroundColor: color,
  pointHoverBackgroundColor: color,
  pointBorderWidth: 0,
  pointHoverBorderWidth: 0,
  clip: 20,
})
