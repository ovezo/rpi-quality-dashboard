import { useEffect, useState } from "react"

import useTraining from "../useTraining";
import TrainingProgress from "./TrainingProgress";
import ImageRenderer from "./ImageRenderer";
import AnomalyResults from "./AnomalyResult";
import SaveModal from "./SaveModal";


const AnomalyTraining = () => {

  const { isLoading, isUpLoading, setFile, trainingError, trainingCompleted, trainingProgress, trainModel, trainedTotalData, trainedImages, setTrainingError, onSaveModel } = useTraining()
  const [trainingStep, setTrainingStep] = useState('preview')

  const onAcceptAction = () => {
    if (trainingError){
      document.getElementById('anomaly_file').value = ""
      setTrainingStep('preview')
      return setTrainingError("")
    }
    if (trainingStep === "preview")
      return onNewTrainingData()
    if (trainingStep === 'image_selected'){
      setTrainingStep('progress')
      trainModel()
      return
    }
    setFile(null)
    document.getElementById('anomaly_file').value = ""
    return setTrainingStep('preview')
  }

  const onNewTrainingData = () => {
    document.getElementById('anomaly_file').click()
  }

  const onSelectedData = (e) => {
    setFile(e.target.files[0])
    setTrainingStep("image_selected")
  }

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 justify-between">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700  flex items-center justify-between">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Anomaly detection
        </h2>

        <button className={`btn h-8 bg-green-500 hover:bg-green-600 text-white ${['preview', 'image_selected'].includes(trainingStep) ? '' : 'hidden'}`} onClick={onNewTrainingData}>
          Upload training data
        </button>
      </header>

      <input
        id="anomaly_file"
        type="file"
        onChange={(e) => onSelectedData(e)}
        className="hidden"
      /> 
     
      {
        trainingError
        ? <ErrorView error={trainingError} />
        : trainingCompleted
        ? <AnomalyResults 
            results={trainedTotalData} 
            totalImage={trainedImages.normal.length+trainedImages.abnormal.length} 
          />
        : trainingStep === 'preview' 
        ? <AnomalyPreview />
        : trainingStep === 'progress'
        ? <TrainingProgress 
            trainingProgress={trainingProgress}
            totalImage={trainedImages.normal.length+trainedImages.abnormal.length} 
            setResult={()=>setTrainingStep("result")} />
        : trainingStep === 'image_selected'
        ? <ImageRenderer trainedImages={trainedImages}/>
        : null
      }
      
      
      
      <div className="text-end px-5 py-5">
        {
          trainingCompleted
          ?
            <SaveModal onSave={(data)=>onSaveModel(data)} />
          :
          null
        }
        <button className="btn h-8 bg-indigo-500 hover:bg-indigo-600 text-white" onClick={onAcceptAction} disabled={trainingStep === 'progress' && !trainingError && !trainingCompleted}>
          {
            trainingError
            ? "Restart"
            : trainingCompleted
            ? "Retrain"
            : trainingStep === 'preview' 
            ? "Start training"
            : trainingStep === 'progress' 
            ?
            ( 
              isUpLoading
              ? "Uploading ..."
              : "Training ..."
            )
            : trainingStep === 'image_selected'
            ? "Start training" 
            : null
          }
        </button>
      </div>
    </div>
  )
}

const AnomalyPreview = () => (
  <div className="py-20 px-5 text-xs text-center text-gray-500">
    The process of finding outliers such as accepted and rejected parts of given dataset. Note: Inspection details will not be there.
  </div>
)

const ErrorView = ({error}) => (
  <div className="py-20 px-5 text-md text-center text-red-500">
    {error}
  </div>
)

export default AnomalyTraining;