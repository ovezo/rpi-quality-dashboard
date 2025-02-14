import React, { useState } from 'react';

import { PhotoProvider, PhotoView } from 'react-photo-view';
import Slider from "react-slick";
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-photo-view/dist/react-photo-view.css';
import { Link, useNavigate } from 'react-router-dom';
import StepProgressBar from './StepProgressBar';
import { LoadingIcon } from './LoadingIcon';
import useDeviceSetup from './useDeviceSetup';
import { api } from '../../store/api';
import { useDevices } from '../../hooks/useDevices';

function RTSPDevice() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {getDevices} = useDevices()

  const createDevice = async (name) => {
    return api.post({ url: `device`, body: {name, stream_url: url} }).then((data, err) => {
      setAdding(false)
      if (err){
        return alert("Something went wrong!")
      }
      getDevices()
      navigate(`/devices`)
    });
  }

  const [url, setUrl] = useState("");

  const navigate = useNavigate()
  const [adding, setAdding] = useState(false)

  const onSave = (e) => {
    e.preventDefault()
    if (!url)
      return alert("Valid url is required!")

    setAdding(true)
    createDevice(`RTSP-cam-${+ new Date()}`)
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
                  

                  <h1 className="text-xl text-slate-800 dark:text-slate-100 font-bold mb-2">Enter an RTSP url for the device</h1>
                  {/* Form */}
                  <form onSubmit={onSave}>
                    <div className="space-y-3 mb-8">

                    <div>
                      <label className="block text-sm font-medium mb-1" htmlFor="url">Name of modal <span className="text-rose-500">*</span></label>
                      <input value={url} onChange={(e)=>setUrl(e.target.value)} id="url" className="form-input w-full px-4 py-2" type="url" required placeholder='rtsp://user:pass@192.168.1.210:554/Robominder/Devices/101' />
                    </div>

                    </div>
                    <div className="flex items-center justify-between">
                      <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto" type='submit'>
                        {
                          adding
                          ?
                          <LoadingIcon/>
                          :
                          <>Next Step -&gt;</>
                        }
                      </button>
                    </div>
                  </form>

                </div>

              </div>
            </div>

          </div>

        </main>

      </div >

    </div >
  );
}

export default RTSPDevice;


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