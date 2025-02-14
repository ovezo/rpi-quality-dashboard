import React, { useState } from 'react';

import { PhotoProvider, PhotoView } from 'react-photo-view';
import Slider from "react-slick";
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import useTraining from './useTraining';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-photo-view/dist/react-photo-view.css';
import UncontrollableDwv from './DicomThumb';
import MyDialog from './DicomViewer';
import TiffViewerGeo from './TiffViewerGeo';
import AnomalyTraining from './AnomalyTraining';
import YoloTraining from './YoloTraining';

function Training() {

  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <div className="flex h-[100dvh] overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden dark:bg-slate-900">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow mt-10">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto lg:relative">
            
            <div className="grid grid-cols-12 gap-6">
              <AnomalyTraining />
              <YoloTraining />

            </div>
              

          </div>

        </main>

      </div >

    </div >
  );
}

export default Training;
