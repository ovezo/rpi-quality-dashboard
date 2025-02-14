import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import DropdownClassic from '../../components/DropdownClassic';
import DeviceMonitoring from './DeviceMonitoring';
import { useDevices } from '../../hooks/useDevices';
import DateTimePickerRange from '../../components/DateTimeRangePicker';
import useMonitoringStats from './useMonitoringStats';
import { convertToLocalTimezone } from '../../utils/Utils';

function Monitoring() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { devices } = useDevices();
  const { statistics, dateRange, setDateRange, deviceName, setDeviceName } = useMonitoringStats();

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
            <div className="sm:flex sm:space-between sm:items-right mb-8">

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* DateTime picker */}
                <DateTimePickerRange dateRange={dateRange} setDateRange={setDateRange} />

                {/* Device picker */}
                <DropdownClassic
                  onSelect={(deviceName) => setDeviceName(deviceName)}
                  options={['All', ...devices.map(e => e.name)]}
                  value={deviceName}
                />
              </div>

            </div>
            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              {/* State of each device */}
              {
                devices.filter(e => (deviceName === 'All' || e.name === deviceName)).map(e => (
                  <DeviceMonitoring
                    key={e.name}
                    stats={statistics.filter(stat => stat.device_name == e.name).map(stat => ({ ...stat, created_at: convertToLocalTimezone(stat.created_at, 'HH:mm:ss')}))}
                    deviceName={e.name} />
                ))
              }
            </div>

          </div>
        </main>

      </div>

    </div>
  );
}

export default Monitoring;