import moment from "moment/moment";

import DoughnutChart from '../../../charts/DoughnutChart';

// Import utilities
import { tailwindConfig } from '../../../utils/Utils';


const AnomalyResults = ({ results, totalImage, time, credit, epochs }) => {

  const trainedAt = moment().format("DD MMM YYYY HH:mm");

  const colors = ["brown", "red", "green", "blue", "purple", "orange", "indigo", ]
  return (
    <div className="px-5 py-4">
      <div className="border border-slate-200 dark:border-slate-700 p-3">
        <div className="justify-between flex text-xs">
          <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-4">
            Training Details
          </h4>
          <div className="text-black dark:text-white">
            <span className="text-gray-500">Trained at: </span> 
            {trainedAt}
          </div>
        </div>
        
        <div className="grid grid-cols-5 gap-4 text-xs text-gray-700 dark:text-gray-300  text-center">
          <div className="text-black dark:text-white">
            <span className="text-gray-500">Mode</span> 
            <br/>Standard
          </div>
          <div className="text-black dark:text-white">
            <span className="text-gray-500">Time</span> 
            <br/>~{time||'1.5'} Min
          </div>
          <div className="text-black dark:text-white">
            <span className="text-gray-500">Credit</span> 
            <br/>{credit||50} Credit
          </div>
          <div className="text-black dark:text-white">
            <span className="text-gray-500">Epochs</span> 
            <br/>{epochs||100}
          </div>
          <div className="text-black dark:text-white">
            <span className="text-gray-500">Images</span> 
            <br/>{totalImage}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {
          Object.keys(results).map(key => (
            <DashboardCard06 key={key} title = {key.replace('metrics/', '')} value={results[key].toFixed(4)} color={colors.pop()}/>
          ))
        }
      </div>
    </div>

  );
};


export function DashboardCard06({title, value, color}) {

  const chartData = {
    datasets: [
      {
        label: title,
        data: [
          value, 1-value
        ],
        backgroundColor: [
          tailwindConfig().theme.colors[color][500],
          tailwindConfig().theme.colors.gray[400],
        ],
        hoverBackgroundColor: [
          tailwindConfig().theme.colors[color][600],
          tailwindConfig().theme.colors.gray[500],
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="text-sm px-5 py-4 border-b border-slate-100 dark:border-slate-700 text-center font-semibold">
        <span className="text-slate-500 dark:text-slate-100">{title}: </span> <br/> <span className="text-black dark:text-white">{value}</span>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={389} height={150} />
    </div>
  );
}

export default AnomalyResults;