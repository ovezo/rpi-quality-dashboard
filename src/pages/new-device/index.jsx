import React, { useEffect, useState } from 'react';

import { PhotoProvider, PhotoView } from 'react-photo-view';
import Slider from "react-slick";
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-photo-view/dist/react-photo-view.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import StepProgressBar from './StepProgressBar';
import DropdownClassic from '../../components/DropdownClassic';
import { LoadingIcon } from './LoadingIcon';
import { useAuth } from '../../context/AuthContext';
import useModels from './useModels.jsx';
import { useDevices } from '../../hooks/useDevices';
import useDeviceSetup from './useDeviceSetup.jsx';

function AddNewDevice() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate()
  
  const {step, devices, newDevice, editDevice, setEditDevice, saveEditedDevice, models, newDeviceObj, setStep} = useDeviceSetup()


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
                  <StepProgressBar step={step}>
                    <Step1 
                      onNext={(selectedDevice)=>setEditDevice({...selectedDevice})} 
                      newDevice={newDeviceObj} 
                      devices={devices}
                    />
                    {/* <Step2 
                      device={editDevice} 
                      onNext={(ssid, ssid_password)=>setEditDevice({...editDevice, ssid, ssid_password})}
                    /> */}
                    <Step4 
                      onNext={(name)=>setEditDevice({...editDevice, name})} 
                      name={editDevice?.name}
                    />
                    <Step3 
                      item={editDevice?.tracking_item} 
                      onNext={(tracking_item)=>setEditDevice({...editDevice, tracking_item})}
                    />
                    <Step5 
                      modelType={editDevice?.modeltype}
                      currentModel={editDevice?.model && `${editDevice?.model} [${editDevice?.modeltype}]`}
                      onNext={(modeltype)=>setEditDevice({...editDevice, modeltype, model: modeltype ? editDevice.model : undefined, modelpath: null})} />
                    <Step6 
                      onNext={(model) => setEditDevice({...editDevice, model: model.title, modelpath: model.path})} 
                      modelName={editDevice?.model}
                      models={models?.filter?.(e => e.type == editDevice?.modeltype)}
                    />
                    <Step7 />
                  </StepProgressBar>

                  {
                    step > 0 && step < 6
                    ?
                      <button onClick={()=>setStep(step-1)} className="btn cursor-pointer bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200 -mt-10 float-left">&lt;- Back</button>
                    :
                      null
                  }



                </div>


                {
                  step === 0
                    ?
                    <div className="flex justify-end gap-8 px-5 py-5 border-t border-slate-100 dark:border-slate-700">
                      {/* <Link className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto" to="/devices/add-rtsp-device">
                        Add new device via RTSP
                      </Link>
                      <Link className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto" to="/devices/add-bluetooth-device">
                        Add new device via Bluetooth
                      </Link> */}
                      <DropdownClassic 
                        onSelect={(selectedDevice)=>{
                          if (selectedDevice === 'via RTSP')
                            navigate('/devices/add-rtsp-device')
                          else
                            navigate('/devices/add-bluetooth-device')
                        }} 
                        value = {"Add new device "}
                        options={ ['via RTSP', 'via Bluetooth'] }
                      />
                    </div>
                    :
                    null
                }

              </div>
            </div>

          </div>

        </main>

      </div >

    </div >
  );
}

export default AddNewDevice;


const Step1 = ({ onNext, newDevice, devices }) => {
  
  const [selectedDevice, setSelectedDevice] = useState()
  const onSave = (e)=>{
    e.preventDefault()
    // if (!selectedDevice){
    //   alert("Select the device!");
    //   return
    // }
    onNext(selectedDevice||newDevice)
  }
  
  return (
    <>
      <h1 className="text-xl text-slate-800 dark:text-slate-100 font-bold mb-2">Select from already added devices</h1>
      {/* Form */}
      <form onSubmit={onSave}>
        <div className="space-y-3 mb-8">
          {
            devices.map( e => (
              <DeviceItem key={e.id} isChecked={selectedDevice?.name === e.name} onSelect={()=>setSelectedDevice(e)} title={e.name} model={e.model ? `${e.modeltype}: ${e.model}` : "No model deployed"} isOnline={e.status === "ONLINE"} />
            ))
          }
          {/* {
            newDevice
            ?
            <DeviceItem isChecked={selectedDevice?.name === newDevice.name} onSelect={()=>setSelectedDevice(newDevice)} title={newDevice.name} model={newDevice.model || "No model deployed"} isOnline={newDevice.status === "ONLINE"} />
            :
            null
          } */}
        </div>
        <div className="flex items-center justify-between">
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto">Next Step -&gt;</button>
        </div>
      </form>
    </>
  )
}

const Step2 = ({ device, onNext }) => {
  
  const [ssid, setSsid] = useState(device.ssid)
  const [password, setPassword] = useState(device.ssid_password)

  const onSave = (e) => {
    e.preventDefault()
    onNext(ssid, password)
  }

  return (
    <>
      <h1 className="text-xl text-slate-800 dark:text-slate-100 font-bold mb-2">WiFi credentials</h1>
      {/* Form */}
      <form onSubmit={onSave}>
        <div className="space-y-3 mb-8">
          {/* WiFi ssid */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="ssid">WiFi SSID<span className="text-rose-500">*</span></label>
            <input id="ssid" className="form-input w-full" type="text" required value={ssid} onChange={(e)=>setSsid(e.target.value)} />
          </div>
          {/* WiFi ssid */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">WiFi password<span className="text-rose-500">*</span></label>
            <input id="password" className="form-input w-full" type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto">Next Step -&gt;</button>
        </div>
      </form>
    </>
  )
}


const Step3 = ({ item, onNext }) => {

  const [mItem, setMItem] = useState(item)
  const onSave = (e) =>{
    e.preventDefault()
    if (!mItem){
      alert("Item title is required!")
    } else {
      onNext(mItem)
    }
  }
  
  return (
    <>
      <h1 className="text-xl text-slate-800 dark:text-slate-100 font-bold mb-2">Item to be tracked</h1>
      {/* Form */}
      <form onSubmit={onSave}>
        <div className="space-y-3 mb-8">
          {/* WiFi ssid */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="item">The item name<span className="text-rose-500">*</span></label>
            <input id="item" className="form-input w-full" type="text" required placeholder='ex: box' value={mItem} onChange={e=>setMItem(e.target.value)}/>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto">Next Step -&gt;</button>
        </div>
      </form>
    </>
  )
}

const Step4 = ({ onNext, name }) => {
  const [newName, setNewName] = useState(name)

  const onSave = (e)=>{
    e.preventDefault()
    if (!newName){
      alert("Name for the device is required!")
    }else{
      onNext(newName)
    }
  }

  return (
    <>
      <h1 className="text-xl text-slate-800 dark:text-slate-100 font-bold mb-2">Rename the connected device</h1>
      {/* Form */}
      <form onSubmit={onSave}>
        <div className="space-y-3 mb-8">
          {/* WiFi ssid */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="device">New name<span className="text-rose-500">*</span></label>
            <input id="device" className="form-input w-full" type="text" required placeholder='ex: device' value={newName} onChange={(e)=>setNewName(e.target.value)}/>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto">Next Step -&gt;</button>
        </div>
      </form>
    </>
  )
}


const Step5 = ({ onNext, modelType, currentModel }) => {

  const [type, setType] = useState(modelType)

  const onSubmit = (e) => {
    e.preventDefault()
    if (type){
      onNext(type)
    } else {
      alert("Select a model type.")
    }
  }

  const onSelect = (key) => {
    setType(key)
  }

  return (
    <>
      <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-2">Deploy a model</h1>
      <div className="text-md text-slate-600 dark:text-slate-100 font-medium mb-6">{currentModel ? `Model deployed: ${currentModel}` : 'No model deployed'}</div>
      {/* Form */}
      <form onSubmit={onSubmit}>
        <div className="sm:flex space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
          <label className="flex-1 relative block cursor-pointer">
            <input type="radio" name="radio-buttons" className="peer sr-only" onChange={(e)=>onSelect("unsupervised")} />
            <div className="h-full text-center bg-white dark:bg-slate-800 px-4 py-6 rounded border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm duration-150 ease-in-out">
              <svg className="inline-flex w-10 h-10 shrink-0 fill-current mb-2" viewBox="0 0 40 40">
                <circle className="text-indigo-100" cx="20" cy="20" r="20" />
                <path className="text-indigo-500" d="m26.371 23.749-3.742-1.5a1 1 0 0 1-.629-.926v-.878A3.982 3.982 0 0 0 24 17v-1.828A4.087 4.087 0 0 0 20 11a4.087 4.087 0 0 0-4 4.172V17a3.982 3.982 0 0 0 2 3.445v.878a1 1 0 0 1-.629.928l-3.742 1.5a1 1 0 0 0-.629.926V27a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.323a1 1 0 0 0-.629-.928Z" />
              </svg>
              <div className="font-medium text-slate-800 dark:text-slate-100 mb-1">Unsupervised</div>
              <div className="text-sm">Unsupervised trained model.</div>
            </div>
            <div className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 dark:peer-checked:border-indigo-500 rounded pointer-events-none" aria-hidden="true"></div>
          </label>
          <label className="flex-1 relative block cursor-pointer">
          <input type="radio" name="radio-buttons" className="peer sr-only" onChange={(e)=>onSelect("supervised")} />
          <div className="h-full text-center bg-white dark:bg-slate-800 px-4 py-6 rounded border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm duration-150 ease-in-out">
              <svg className="inline-flex w-10 h-10 shrink-0 fill-current mb-2" viewBox="0 0 40 40">
                <circle className="text-indigo-100" cx="20" cy="20" r="20" />
                <path className="text-indigo-500" d="m26.371 23.749-3.742-1.5a1 1 0 0 1-.629-.926v-.878A3.982 3.982 0 0 0 24 17v-1.828A4.087 4.087 0 0 0 20 11a4.087 4.087 0 0 0-4 4.172V17a3.982 3.982 0 0 0 2 3.445v.878a1 1 0 0 1-.629.928l-3.742 1.5a1 1 0 0 0-.629.926V27a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.323a1 1 0 0 0-.629-.928Z" />
                <circle className="text-indigo-100" cx="20" cy="20" r="20" />
                <path className="text-indigo-300" d="m30.377 22.749-3.709-1.5a1 1 0 0 1-.623-.926v-.878A3.989 3.989 0 0 0 28.027 16v-1.828c.047-2.257-1.728-4.124-3.964-4.172-2.236.048-4.011 1.915-3.964 4.172V16a3.989 3.989 0 0 0 1.982 3.445v.878a1 1 0 0 1-.623.928c-.906.266-1.626.557-2.159.872-.533.315-1.3 1.272-2.299 2.872 1.131.453 6.075-.546 6.072.682V28a2.99 2.99 0 0 1-.182 1h7.119A.996.996 0 0 0 31 28v-4.323a1 1 0 0 0-.623-.928Z" />
                <path className="text-indigo-500" d="m22.371 24.749-3.742-1.5a1 1 0 0 1-.629-.926v-.878A3.982 3.982 0 0 0 20 18v-1.828A4.087 4.087 0 0 0 16 12a4.087 4.087 0 0 0-4 4.172V18a3.982 3.982 0 0 0 2 3.445v.878a1 1 0 0 1-.629.928l-3.742 1.5a1 1 0 0 0-.629.926V28a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.323a1 1 0 0 0-.629-.928Z" />
              </svg>
              <div className="font-medium text-slate-800 dark:text-slate-100 mb-1">Supervised</div>
              <div className="text-sm">Supervised trained model.</div>
            </div>
            <div className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 dark:peer-checked:border-indigo-500 rounded pointer-events-none" aria-hidden="true"></div>
          </label>
        </div>
        <div className='text-end pb-10'>
          <span className='underline cursor-pointer' onClick={()=>onNext()}>Continue without a model -&gt;</span>
        </div>
        <div className="flex items-center justify-between w-full">
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto">Next Step -&gt;</button>
        </div>
      </form>
    </>
  )
}

const Step6 = ({ onNext, models, modelName }) => {
  const [model, _setModel] = useState(modelName)
  const [adding, setAdding] = useState(false)

  const setModel = (model) => {
    _setModel(model)
  }

  const onSave = (e) => {
    e.preventDefault()
    setAdding(true)
    setTimeout(()=>{
      onNext(model)
    }, 3000)
  }

  return (
    <>
      <h1 className="text-xl text-slate-800 dark:text-slate-100 font-bold mb-2">Deploy a model</h1>
      {/* Form */}
      <form onSubmit={onSave}>
        <div className="space-y-3 mb-8">
          {
            models.map(e => <ModelItem 
              isSelected={model?.title === e.title} 
              key={e.title} 
              title={e.title} 
              date={new Date(e.created_at*1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })} 
              onSelect={()=>setModel(e)}/>
            )
          }
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
    </>
  )
}



const Step7 = ({ onNext }) => (
  <>
    {/* Form */}
    <div className="px-4 py-8">
      <div className="max-w-md mx-auto">

        <div className="text-center">
          <svg className="inline-flex w-16 h-16 fill-current mb-6" viewBox="0 0 64 64">
            <circle className="text-emerald-100 dark:text-emerald-400/30" cx="32" cy="32" r="32" />
            <path className="text-emerald-500 dark:text-emerald-400" d="m28.5 41-8-8 3-3 5 5 12-12 3 3z" />
          </svg>
          <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-8">Device added successfully!</h1>
          <Link className="btn bg-indigo-500 hover:bg-indigo-600 text-white" to="/">Go To Dashboard -&gt;</Link>
        </div>

      </div>
    </div>
  </>
)


const ModelItem = ({ title, date, onSelect, isSelected}) => {
  return (
    <label className="relative block cursor-pointer">
      <input type="radio" name="radio-buttons" className="peer sr-only" onChange={onSelect} checked={isSelected} />
      <div className="flex flex-wrap justify-between items-center bg-white text-sm font-medium text-slate-800 dark:text-slate-100 p-4 rounded dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm duration-150 ease-in-out">
        <div className="flex items-center">
          <svg className="w-6 h-6 shrink-0 fill-current mr-4" viewBox="0 0 24 24">
            <path className="text-indigo-500" d="m12 10.856 9-5-8.514-4.73a1 1 0 0 0-.972 0L3 5.856l9 5Z" />
            <path className="text-indigo-300" d="m11 12.588-9-5V18a1 1 0 0 0 .514.874L11 23.588v-11Z" />
            <path className="text-indigo-200" d="M13 12.588v11l8.486-4.714A1 1 0 0 0 22 18V7.589l-9 4.999Z" />
          </svg>
          <div>
            <span className='font-semibold'>{title}</span>
          </div>
        </div>
        <div className={"text-gray-500 text-sm"}>
          {date}
        </div>
      </div>
      <div className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 dark:peer-checked:border-indigo-500 rounded pointer-events-none" aria-hidden="true"></div>
    </label>
  )
}

const DeviceItem = ({ title, isOnline, model, isChecked, onSelect }) => {
  return (
    <label className="relative block cursor-pointer">
      <input type="radio" name="radio-buttons" className="peer sr-only" checked={isChecked} onChange={()=>onSelect()} />
      <div className="flex flex-wrap justify-between items-center bg-white text-sm font-medium text-slate-800 dark:text-slate-100 p-4 rounded dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm duration-150 ease-in-out">
        <div className="flex items-center">
          <svg className="w-6 h-6 shrink-0 fill-current mr-4" viewBox="0 0 24 24">
            <path className="text-indigo-500" d="m12 10.856 9-5-8.514-4.73a1 1 0 0 0-.972 0L3 5.856l9 5Z" />
            <path className="text-indigo-300" d="m11 12.588-9-5V18a1 1 0 0 0 .514.874L11 23.588v-11Z" />
            <path className="text-indigo-200" d="M13 12.588v11l8.486-4.714A1 1 0 0 0 22 18V7.589l-9 4.999Z" />
          </svg>
          <div>
            <span className='font-semibold'>{title}</span>
            <div className='text-sm text-gray-500'>
              {model ? model : "No model deployed"}
            </div>
          </div>
        </div>
        <div className={`border ${isOnline ? 'bg-green-500 border-green-600' : 'bg-red-500 border-red-600'} text-white rounded-md px-2`}>
          {isOnline ? "ONLINE" : "OFFLINE"}
        </div>
      </div>
      <div className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 dark:peer-checked:border-indigo-500 rounded pointer-events-none" aria-hidden="true"></div>
    </label>
  )
}