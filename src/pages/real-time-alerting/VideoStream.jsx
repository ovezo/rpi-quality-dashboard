import React, { useState, useEffect, useCallback } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import { defectRelabeling } from "../../utils/Utils"


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import moment from 'moment/moment';

import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import TotalsByStatus from './TotalsByStatus';

import useFrames from './useFrames';
import DateTimePickerRange from '../../components/DateTimeRangePicker';
import useRTData from './useRTData';
import useCurrent1HrRange from './useCurrent1HrRange';
import { useAuth } from '../../context/AuthContext';
import HlsPlayer from './HlsPlayer';
import Stream from './Stream';


const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5
};
const elementSize = 640;

function VideoStream() {

  const { user } = useAuth()
  const { trackingItem } = user

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {current1HrRange} = useCurrent1HrRange()
  const {counts, device, liveImage, videoData} = useRTData()
  const { frames, dateRange, setDateRange, defaultLiveImage, isLoading } = useFrames()

  const mLiveImage = liveImage || defaultLiveImage 
  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white dark:bg-slate-900">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="lg:relative lg:flex">
            {/* Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-4 max-w-9xl min-w-max">
              {/* Page header */}
              <div className="sm:flex sm:justify-between sm:items-center mb-4">
                {/* Left: Title */}
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-xl md:text-xl text-slate-800 dark:text-slate-100 font-bold">Real Time Alerting</h1>
                  <h3 className="text-sm md:text-sm text-slate-500">Results between {current1HrRange}</h3>
                </div>

              </div>

              {/* Statuses */}
              <div className="space-y-2">
                <TotalsByStatus label={`Total ${trackingItem}s`} count={counts.total} type="bold" />
                <TotalsByStatus label={`Normal ${trackingItem}s`} count={counts.normal} color="green" type="bold"/>
                <TotalsByStatus label={`Defected ${trackingItem}s`} count={counts.total - counts.normal} color="red" type="bold"/>
                <div className='h-4'></div>

                <TotalsByStatus label="Total # of Defects" count={counts.A + counts.B + counts.C + counts.D + counts.E + counts.F + counts.unpacked_box} />
                <TotalsByStatus 
                    label="Defect Ratio" 
                    count={
                        counts.total > 0 
                            ? `${((counts.total - counts.normal) * 100 / counts.total).toFixed(1)}%` 
                            : '0%'
                    }
                />
                <div className='h-4'></div>
              </div>
            </div>

            {/* Sidebar */}
            <div className='w-full mx-auto'>
              <div className="lg:sticky lg:top-16 bg-slate-50 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 h-full">
                <div className="py-8 px-4 lg:px-8">
                  <div
                    className="mx-auto"
                    style={{
                      maxWidth: "550px",
                      height: "auto",
                    }}>
                    <div className="text-slate-800 dark:text-slate-100 font-semibold text-center mb-6">
                      <h2 style={{ textAlign: "center", color: (mLiveImage["normal"] ? "green" : "red") }}>
                        {(mLiveImage["normal"] ? "Normal Box Detected" : Object.keys(mLiveImage).filter((elem, index)=>mLiveImage[elem]==1).map((elem, index)=>defectRelabeling[elem]).join(', '))}
                      </h2>
                    </div>
                    {/* Credit Card */}
                    <div className={`relative aspect-[7/5] bg-gradient-to-tr from-slate-600 to-slate-800 p-5 rounded-xl shadow-lg overflow-hidden ${(!mLiveImage["normal"] ? "outline outline-offset-2 outline-4 outline-red-500" :  "outline outline-offset-2 outline-4 outline-green-500")}`}>
                      {/* Illustration on card */}
                      <div className="absolute inset-0 w-full h-full" aria-hidden="true">
                        {
                          device?.stream_url?.startsWith?.('rtsp')
                          ? <Stream />
                          : videoData || true
                          ? <img alt="Live Stream" width="100%" height="100%" src={videoData}></img>
                          : mLiveImage["frame_url"]
                            ? <img key={mLiveImage["frame_url"]} width="100%" height="100%" src={googleUrl + mLiveImage["frame_url"]}></img>
                            : <div className='flex flex-col items-center justify-center h-full text-white'><p>{isLoading ? 'Loading ...' : 'No frame'}</p></div>
                        }
                      </div>
                    </div>

                    {/* Details */}
                    <div className="mt-6">
                      <ul>
                        <li className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                          <div className="text-sm">Device name: </div>
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-100 ml-2"> {device.name} </div>
                          |
                          <div className="text-sm">Status: </div>
                          <div className="flex items-center whitespace-nowrap">
                            <div className={"w-2 h-2 rounded-full mr-2 " + (device.status == 'ONLINE' ? "bg-emerald-500" : "bg-red-500")} />
                            <div className="text-sm font-medium text-slate-800 dark:text-slate-100"> {device.status} </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between py-2">
                        <span className='text-center font-bold mb-1 flex-item'> History Timeline </span>
                        {/* DateTime picker */}
                        <DateTimePickerRange dateRange={dateRange} setDateRange={setDateRange} />
                      </div>
                      <div>
                      <PhotoProvider maskOpacity={0.8}>
                        {
                          frames.length
                          ?
                            <Slider {...settings}>
                              {
                                frames.map((e, i) => (
                                  <div className='p-1' key={i}>
                                  
                                      <PhotoView 
                                        // src={googleUrl + e.frame_url}
                                        width={640}
                                        height={480}
                                        render={({ scale, attrs }) => {
                                          const width = attrs.style.width;
                                          const offset = (width - elementSize) / elementSize;
                                          const childScale = scale === 1 ? scale + offset : 1 + offset;
                                          console.log(e,"ee");
                                          return (
                                            <div {...attrs}>
                                              <div style={{ transform: `scale(${childScale})`, width: elementSize, transformOrigin: '10 10' }}>
                                                <p style={{color: (e.normal?"green":"red"), textAlign:"center", fontSize: 20}}>{(e.normal?"Normal Box": Object.keys(e).filter((elem, index)=>e[elem]==1).map((elem, index)=>defectRelabeling[elem]).join(', ') )}</p>
                                                <img 
                                                  src={googleUrl + e.frame_url} 
                                                  style={{border: `7px solid ${(e.normal?"green":"red")}`}}
                                                />
                                              </div>
                                            </div>
                                          );
                                        }}
                                      >
                                        <div>
                                          <img 
                                            src={googleUrl + e.frame_url}
                                            className={`outline outline-offset-1 outline-2 ${e.normal ? 'outline-green-500' : 'outline-red-500'}`}
                                          />
                                          <p className='text-center text-xs font-semibold pt-1'>{e.created_at}</p>
                                        </div>
                                      </PhotoView>
                                    
                                  </div>
                                ))
                              }
                            </Slider>
                          :
                            <center className='mb-2 mt-12'>{isLoading ? 'Loading ...' : 'No detections for the selected time frame.'}</center>
                        }
                        
                        </PhotoProvider>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default VideoStream;