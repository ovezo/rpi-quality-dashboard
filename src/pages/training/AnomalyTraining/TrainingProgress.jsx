import { useEffect, useState } from "react"


const TrainingProgress = ({totalImage, setResult, time, credit, epochs, trainingProgress}) => {
  if(trainingProgress >= 100)
    setResult?.()
  return (
    <div>
      <div className="px-5 py-4">
        <h3 className="text-md font-semibold text-slate-800 dark:text-slate-100 mb-1">
          Training Details
        </h3>
        
        <div className="grid grid-cols-5 gap-4 text-xs text-gray-700 dark:text-gray-300  border border-slate-200 dark:border-slate-700 text-center p-5">
          <div>
            <span className="font-semibold">Mode</span> 
            <br/>Standard
          </div>
          <div>
            <span className="font-semibold">Time</span> 
            <br/>~{time || 1.5} Min
          </div>
          <div>
            <span className="font-semibold">Credit</span> 
            <br/>{credit || 50} Credit
          </div>
          <div>
            <span className="font-semibold">Epochs</span> 
            <br/>{epochs || 100}
          </div>
          <div>
            <span className="font-semibold">Images</span> 
            <br/>{totalImage}
          </div>
        </div>
      </div>

      <div className="border border-slate-200 dark:border-slate-700 p-10 mx-5">
        <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300">
          Initializing
        </h4>
        <p className="text-sm text-gray-500 mb-4">
          Please wait while training finishes...
        </p>

        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 mt-20">
          <div className={`bg-indigo-500 h-2 text-xs font-medium text-white text-center p-1 leading-none rounded-full font-size-10`} style={{ width: `${trainingProgress}%` }}>
            {/* {progress} % */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrainingProgress;