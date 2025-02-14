import React, { useEffect, useState } from 'react';

import { PhotoProvider, PhotoView } from 'react-photo-view';
import Slider from "react-slick";
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

import search from '../../images/magnifier.gif'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-photo-view/dist/react-photo-view.css';
import StepProgressBar from './StepProgressBar';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingIcon } from './LoadingIcon';
function BluetoothDevices() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  

  const [scanning, setScanning] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setScanning(false)
    }, 10*1000)
  }, [])

  const navigate = useNavigate()
  const [adding, setAdding] = useState(false)

  const onSave = () => {
    setAdding(true)
    setTimeout(()=>{
      navigate("/devices/Cam-TC103")
    }, 3000)
  }


  return (
    <div className="flex h-[100dvh] overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden dark:bg-slate-900">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow mt-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto lg:relative">

            <div className="grid grid-cols-12 gap-6">

              <div className="flex flex-col col-span-full md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 justify-between">
                <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700  flex items-center justify-between">
                  <h2 className="font-semibold text-slate-800 dark:text-slate-100">
                    Device setup
                  </h2>

                </header>


                <div className="m-10">

                  {/* Progress bar */}
                  <StepProgressBar step={0}/>


                  <h1 className="text-xl text-slate-800 dark:text-slate-100 font-bold mb-2">Device {scanning ? 'scanning' : "found"}</h1>
                  {/* Form */}
                  <div>
                    <div className="space-y-3 mb-8">
                      {
                        scanning
                        ?
                          <BluetoothScanning />
                        :
                          <BluetoothItem title={"Cam-TC103"} />
                      }

                    </div>
                    <div className="flex items-center justify-between">
                      <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto" onClick={()=>onSave()}>
                        {
                          adding
                          ?
                          <LoadingIcon/>
                          :
                          <>Next Step -&gt;</>
                        }
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </main>

      </div >

    </div >
  );
}

export default BluetoothDevices;


const BluetoothItem = ({ title, isOnline, model }) => {
  return (
    <label className="relative block cursor-pointer">
      <input type="radio" name="radio-buttons" className="peer sr-only" defaultChecked />
      <div className="flex flex-wrap justify-between items-center bg-white text-sm font-medium text-slate-800 dark:text-slate-100 p-4 rounded dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm duration-150 ease-in-out">
        <div className="flex items-center">
          <svg className="icon icon-tabler icon-tabler-bluetooth w-6 h-6 mr-4 text-white bg-indigo-500 rounded-md" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 8l10 8l-5 4l0 -16l5 4l-10 8" />
          </svg>
          <span className='font-semibold'>{title}</span>
        </div>
      </div>
      <div className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 dark:peer-checked:border-indigo-500 rounded pointer-events-none" aria-hidden="true"></div>
    </label>
  )
}


const BluetoothScanning = () => (
  <div className='text-center flex justify-center p-8'>
    <img src={search} width={80}/>
  </div>
)