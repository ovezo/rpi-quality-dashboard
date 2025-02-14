import React from 'react';
import RMD from '../../images/imageRobo.png'
import PrimaryButton from '../../components/buttons/PrimaryButton';


function RoboMinderDevice() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">RoboMinder Device</h2>
      <div className="py-5 px-5 rounded-xl bg-white dark:bg-slate-800 shadow-sm duration-150 ease-in-out">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center">
            <img src={RMD} alt="RoboMinder" className="w-1/4 -mb-5 mr-8" />
            <div>
              <h3 className="text-xl font-bold flex items-center">
                Medium Closer <span className="ml-2 w-3 h-3 bg-green-500 rounded-full"></span>
              </h3>
              <div className="text-gray-400">Software v.1.1. • Ubuntu • IP: 192.168.1.101</div>
            </div>
          </div>
          <PrimaryButton className="dark:bg-slate-600 min-w-48 p-4 rounded-lg">Choose AI Model</PrimaryButton>
        </div>
      </div>  
    </div>
  );
}

export default RoboMinderDevice;