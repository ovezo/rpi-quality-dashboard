import React, { useState } from 'react';
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import MHeader from './Header';
import RoboMinderDevice from './RoboMinderDevice';
import AssetsList from './AssetsList';

function ProcessDetail() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex h-[100dvh] overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto space-y-10">
            <MHeader />

            <RoboMinderDevice />

            <AssetsList />
          </div>
        </main>

      </div>



    </div>
 
  );
}

export default ProcessDetail;