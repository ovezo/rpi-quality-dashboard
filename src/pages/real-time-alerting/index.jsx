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
import DeviceWithFrames from './DeviceWithFrames';
import VideoIcon from '../../partials/svgComponents/VideoIcon';
import DetectBoxIcon from './svgIcons/DetectBoxIcon';
import PlayIcon from './svgIcons/PlayIcon';
import SkipBackIcon from './svgIcons/SkipBackIcon';
import SkipForwardIcon from './svgIcons/SkipForwordIcon';
import BookmarkIcon from './svgIcons/BookmarkIcon';
import DownloadIcon from './svgIcons/DownloadIcon';
import FlagIcon from './svgIcons/FlagIcon';

// import di0 from '../../images/defected0.jpeg'
// import di1 from '../../images/defected1.jpeg'
// import di2 from '../../images/defected2.jpeg'
// import di3 from '../../images/defected3.jpeg'
// import di4 from '../../images/defected4.jpeg'
// import di5 from '../../images/defected5.jpeg'
// import di6 from '../../images/defected6.jpeg'
// import di7 from '../../images/defected7.jpeg'
// import di8 from '../../images/defected8.jpeg'
// import di9 from '../../images/defected9.jpeg'
// import ni0 from '../../images/normal0.jpeg'
// import ni1 from '../../images/normal1.jpeg'
// import ni2 from '../../images/normal2.jpeg'
// import ni3 from '../../images/normal3.jpeg'
// import ni4 from '../../images/normal4.jpeg'
// import ni5 from '../../images/normal5.jpeg'
// import ni6 from '../../images/normal6.jpeg'
// import ni7 from '../../images/normal7.jpeg'
// import ni8 from '../../images/normal8.jpeg'
// import ni9 from '../../images/normal9.jpeg'

// const defectedImages = [di0, di1, di2, di3, di4, di5, di6, di7, di8, di9]
// const normalImages = [ni0, ni1, ni2, ni3, ni4, ni5, ni6, ni7, ni8, ni9]

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
  const { frames, dateRange, setDateRange, defaultLiveImage, isLoading, setFrames } = useFrames()
  
  const {counts, device, liveFrame, videoData} = useRTData()

  useEffect(()=>{
    if (liveFrame){
      setFrames([liveFrame, ...frames].slice(0, 50))
    }
  }, [liveFrame])

  const [selectedFrame, setSelectedFrame] = useState()
  const getNextFrame = () => {
    if (!selectedFrame)
      return
    let prevFrame = {}
    for (const frame of frames) {
      if (prevFrame.id === selectedFrame.id)
        return frame
      prevFrame = frame
    }
    return null
  }
  const getPrevFrame = () => {
    if (!selectedFrame)
      return
    let prevFrame = null
    for (const frame of frames) {
      if (frame.id === selectedFrame.id)
        return prevFrame
      prevFrame = frame
    }
    return null
  }

  const NO_FRAMES = !(device?.modelpath && !device.modelpath.includes("YOLO.py"))

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden border-slate-200 dark:bg-slate-900">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow p-8">
          <div className="grid grid-cols-4 gap-8">

            {/* Page header */}
            <h1 className="col-span-full text-2xl md:text-2xl text-slate-800 dark:text-slate-100 font-bold">Real Time Alerting</h1>

            {/* Devices */}
            <div className={NO_FRAMES ? 'hidden' : 'col-span-2'}>
              
              {/* Statuses */}
              <div className="space-y-4">
                <DeviceWithFrames 
                  onSelectFrame={(frame)=>setSelectedFrame(frame)} 
                  label={device?.name} count={counts.total} type="bold" 
                  frames={frames}
                  selectedFrame = {selectedFrame}
                  />
              </div>
            </div>

            {/* Present selected image */}
            <div className={NO_FRAMES ? 'col-span-2 col-start-2' : 'col-span-2'}> {/* Center when devices are hidden */}
              <div className="lg:sticky lg:top-16 bg-white dark:bg-slate-800 rounded-xl lg:overflow-x-hidden lg:overflow-y-auto no-scrollbar lg:shrink-0">
                {/* Display */}
                <div className={`relative aspect-[7/5] bg-gradient-to-tr from-slate-600 to-slate-800 overflow-hidden border-b-4 ${(selectedFrame?.normal === 0 ? "border-red-500" : selectedFrame?.normal === 1 ? "border-green-500" : "border-gray-500")}`}>
                  {/* Illustration on card */}
                  <div className="absolute inset-0 w-full h-full" aria-hidden="true">

                    {
                      device?.stream_url?.startsWith?.('rtsp')
                      ? <Stream />
                      : videoData && NO_FRAMES
                      ? <img src={videoData.src} />
                      : selectedFrame
                      ? <img key={selectedFrame?.frame_url} width="100%" height="100%" src={googleUrl + selectedFrame.frame_url}></img>
                      : <div className='flex flex-col items-center justify-center h-full text-white'><p>{isLoading ? 'Loading ...' : 'No frame'}</p></div>
                    }
                  </div>
                </div>
                <div className="py-7 px-8 space-y-6">
                  
                  <div className='grid grid-cols-12'>
                    <div className='col-span-7 text-slate-800 dark:text-slate-100'>
                      <h2 className='text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2'>{device?.model || "No model deployed"}</h2>
                      {
                        videoData && NO_FRAMES
                        ?
                        <>
                          <div className='text-sm'>{moment(videoData?.timestamp).format('DD MMMM, YYYY')}</div> {/* Current date */}
                          <div className='text-sm'>{moment(videoData?.timestamp).format('HH:mm:ss')}</div> {/* Current time */}
                        </>
                        : null
                      }
                      {
                        selectedFrame
                        ?
                        <>
                          <div className='text-sm'>{moment(selectedFrame.created_at).format('DD MMMM, YYYY')}</div> {/* Current date */}
                          <div className='text-sm'>{moment(selectedFrame.created_at).format('HH:mm:ss')}</div> {/* Current time */}
                        </>
                        : null
                      }
                    </div>
                    <div className='col-span-5'>
                      <div className='flex flex-wrap items-center space-x-2'>
                        <VideoIcon size={8}/>
                        <h2 className='text-sm text-slate-800 dark:text-slate-100'>{device?.name}</h2>
                      </div>
                      {/* <div className='flex flex-wrap items-center space-x-2'>
                        <DetectBoxIcon size={8}/>
                        <h2 className='text-sm text-slate-800 dark:text-slate-100'>BoxDefectDetection</h2>
                      </div> */}
                    </div>
                  </div>
                  <div className={'flex justify-between' + (NO_FRAMES ? ' hidden' : '')}>
                    <ActionButtons
                      Icon={SkipBackIcon}
                      disabled={!getPrevFrame()}
                      onClick={()=>{
                        let frame = getPrevFrame()
                        if (!frame)
                          return
                        setSelectedFrame(frame)
                      }}
                    />
                    {/* <ActionButtons
                      Icon={PlayIcon}
                    /> */}
                    <ActionButtons
                      Icon={SkipForwardIcon}
                      disabled={!getNextFrame()}
                      onClick={()=>{
                        let frame = getNextFrame()
                        if (!frame)
                          return
                        setSelectedFrame(frame)
                      }}
                    />
                    <ActionButtons
                      disabled
                      Icon={BookmarkIcon}
                    />
                    <ActionButtons
                      Icon={DownloadIcon}
                      disabled={true}
                    />
                    <ActionButtons
                      disabled
                      Icon={FlagIcon}
                    />
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

const ActionButtons = ({Icon, onClick, disabled}) => (
  <div className={`aspect-[3/1] bg-slate-200 dark:bg-slate-900 rounded-lg py-3 flex justify-center items-center !text-white dark:text-slate-900 ${disabled ? 'opacity-40 cursor-auto' : 'opacity-100 cursor-pointer'}`} onClick={onClick}>
    <Icon size={6} />
  </div>
)

export default VideoStream;