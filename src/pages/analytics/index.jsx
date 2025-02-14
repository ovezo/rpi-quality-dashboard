import React, { useState, useEffect } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import Datepicker from '../../components/Datepicker';
import NormalBoxBarChart from './NormalBoxBarChart';
import DefectsByType from './DefectsByType';
import DefectsByDevice from './DefectsByDevice';
import TotalsCard from './TotalsCard';
import DropdownClassic from '../../components/DropdownClassic';
import DefectRatiosByDevice from './DefectRatiosByDevice';
import { useDevices } from '../../hooks/useDevices';
import useAnalyticsStats from './useAnalyticsStats';
import { CSVLink, CSVDownload } from "react-csv";
import { useAuth } from '../../context/AuthContext';

const exportTypes = [
  "Stats by defect",
  "Stats by device"
]

function Analytics() {

  const { user } = useAuth()
  const { trackingItem } = user

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ exportType, setExportType ] = useState(exportTypes[0]);
  
  const { devices } = useDevices()

  const { 
    statsPerDefect, 
    statsPerDevice, 
    counts, 
    setDates, 
    deviceName, 
    setDeviceName 
  } = useAnalyticsStats()

  const getCSVData = () => {
    if(exportTypes[0] == exportType){
      return statsPerDefect;
    }else{
      return statsPerDevice;
    }
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Dashboard actions */}
            <div className="sm:flex sm:space-between sm:items-right mb-8 justify-between">
             
              {/* Right: Actions */}
              <div className="grid grid-flow-col justify-start sm:justify-end gap-2">
                {/* Datepicker built with flatpickr */}
                <Datepicker 
                  align="left" 
                  callback={(start_date, end_date)=>{ setDates({start_date, end_date}) }} 
                />
  
                <DropdownClassic 
                  onSelect={(deviceName)=>setDeviceName(deviceName)} 
                  value = {deviceName}
                  options={ ['All devices', ...devices.map(device => device.name)] }
                />

              </div>
              <div className="grid grid-flow-col justify-end sm:justify-end gap-2">
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-200 rounded inline-flex items-center">
                  <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                  <CSVLink data={getCSVData()} filename={"boots-report.csv"}>export CSV</CSVLink>
                </button>

                <DropdownClassic 
                  onSelect={(type)=>setExportType(type)} 
                  value = { exportType }
                  options={ exportTypes }
                />
              </div>

            </div>

            <div className="grid grid-cols-12 gap-6 mb-5">
              <TotalsCard header={`Total Number of ${trackingItem}s`} value={counts?.total}/>
              <TotalsCard header={`Number of Normal ${trackingItem}s`} value={counts?.normal} />
              <TotalsCard header={`Number of Defected ${trackingItem}s`} value={(counts?.total-counts?.normal)} />
              <TotalsCard header="Total Defects Ratio" value={Math.round(((counts?.total-counts?.normal)/(counts?.total)) * 10000)/100 + '%'} />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              {/* Bar chart (Direct vs Indirect) */}
              <NormalBoxBarChart  stats={statsPerDevice} />
              {/* Line chart (Sales Over Time) */}
              <DefectsByType stats={statsPerDefect} deviceName={deviceName}/>
            
            </div>

          </div>
        </main>

      </div>

    </div>
  );
}

export default Analytics;