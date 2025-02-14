import { useEffect, useState } from "react"
import { PhotoProvider, PhotoView } from 'react-photo-view';
import Slider from "react-slick";
import TrainingProgress from "./AnomalyTraining/TrainingProgress";
import ImageRenderer from "./AnomalyTraining/ImageRenderer";
import AnomalyResults from "./AnomalyTraining/AnomalyResult";
import SaveModal from "./AnomalyTraining/SaveModal";
import useYoloTraining from "./useYoloTraining";


const YoloTraining = () => {

  
  const { 
    isLoading,
    isUpLoading,
    setFile,
    trainingError,
    trainingCompleted,
    trainingProgress,
    trainModel,
    trainedTotalData,
    trainedImages,
    onSaveModel,
    parameters,
    setTrainingError,
    setParameters
  } = useYoloTraining()
  const [trainingStep, setTrainingStep] = useState('preview')

  const onAcceptAction = () => {
    if (trainingError){
      document.getElementById('yolo_file').value = ""
      setTrainingStep('preview')
      return setTrainingError("")
    }
    if (trainingStep === "preview")
      return onNewTrainingData()
    if (trainingStep === 'image_selected')
      return setTrainingStep('parameters')
    if (trainingStep === 'parameters'){
      setTrainingStep('progress')
      trainModel()
      return
    }
    setFile(null)
    document.getElementById('yolo_file').value = ""
    return setTrainingStep('preview')
  }

  const onNewTrainingData = () => {
    document.getElementById('yolo_file').click()
  }

  const onSelectedData = (e) => {
    setFile(e.target.files[0])
    setTrainingStep("image_selected")
  }

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 justify-between">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700  flex items-center justify-between">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">
          Supervised detection
        </h2>

        <button className={`btn h-8 bg-green-500 hover:bg-green-600 text-white ${['preview', 'image_selected'].includes(trainingStep) ? '' : 'hidden'}`} onClick={onNewTrainingData}>
          Upload training data
        </button>
      </header>

      <input
        id="yolo_file"
        type="file"
        onChange={(e) => onSelectedData(e)}
        className="hidden"
      />
      
     
      {
        trainingError
        ? <ErrorView error={trainingError} />
        : trainingStep === 'preview' 
        ? <AnomalyPreview />
        : trainingStep === 'image_selected'
        ? <ImageRenderer trainedImages={trainedImages} normalLabel="Annotated images"  slidesPerRow = {5}/>
        : trainingStep === 'parameters'
        ? <TrainingParametersForm 
          parameters={parameters}
          setParameters={setParameters}
          onSubmit={onAcceptAction} />
        : trainingCompleted
        ? <AnomalyResults 
            results={trainedTotalData} 
            totalImage={trainedImages.train.length+trainedImages.test.length+trainedImages.valid.length} 
            time={"5"}
            credit={80}
            epochs={parameters.epochs}
          />
        : trainingStep === "progress"
        ? <TrainingProgress 
            totalImage={trainedImages.train.length+trainedImages.test.length+trainedImages.valid.length} 
            trainingProgress={trainingProgress}
            setResult={()=>setTrainingStep("result")}
            time={"5"}
            epochs={parameters.epochs}
            credit={80}
            />
        : null
      }
      
      
      
      <div className="text-end px-5 py-5">
        {
          trainingCompleted
          ?
            <SaveModal onSave={(name) => onSaveModel(name)} />
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
            ? "Training ..."
            : trainingStep === 'image_selected'
            ? "Select parameters"
            : trainingStep === 'parameters'
            ? "Start training" 
            : trainingCompleted
            ? "Retrain"
            : null
          }
        </button>
      </div>
    </div>
  )
}

const AnomalyPreview = () => (
  <div className="py-20 px-5 text-xs text-center text-gray-500">
    The process in which parameters of model must be adjusted very precisely with pretrain neural network modeling order to fit with certain observations.
  </div>
)

const ErrorView = ({error}) => (
  <div className="py-20 px-5 text-md text-center text-red-500">
    {error}
  </div>
)



const TrainingParametersForm = ({ onSubmit, parameters, setParameters }) => {
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setParameters({
      ...parameters,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(parameters); // Pass parameters to the parent component or handle it directly
  };

  return (
    <form 
      className="bg-white dark:bg-slate-800 rounded-sm p-6 " 
      onSubmit={handleSubmit}
    >
      <h2 className="text-md font-semibold text-slate-800 dark:text-slate-100 mb-2">
        Training Parameters
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Epochs */}
        <div className="">
          <label className="block text-gray-700 dark:text-gray-300 text-xs font-bold" htmlFor="epochs">
            Epochs
          </label>
          <input
            type="number"
            id="epochs"
            name="epochs"
            value={parameters.epochs}
            onChange={handleChange}
            className="shadow appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Image Size */}
        <div className="">
          <label className="block text-gray-700 dark:text-gray-300 text-xs font-bold" htmlFor="imgsz">
            Image Size (imgsz)
          </label>
          <input
            type="number"
            id="imgsz"
            name="imgsz"
            value={parameters.image_size}
            onChange={handleChange}
            className="shadow appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Close Mosaic */}
        <div className="">
          <label className="block text-gray-700 dark:text-gray-300 text-xs font-bold" htmlFor="close_mosaic">
            Close Mosaic
          </label>
          <input
            type="number"
            id="close_mosaic"
            name="close_mosaic"
            value={parameters.close_mosaic}
            onChange={handleChange}
            className="shadow appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Dropout */}
        <div className="">
          <label className="block text-gray-700 dark:text-gray-300 text-xs font-bold" htmlFor="dropout">
            Dropout
          </label>
          <input
            type="number"
            step="0.01"
            id="dropout"
            name="dropout"
            value={parameters.dropout}
            onChange={handleChange}
            className="shadow appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Batch Size */}
        <div className="">
          <label className="block text-gray-700 dark:text-gray-300 text-xs font-bold" htmlFor="batch_size">
            Batch Size
          </label>
          <input
            type="number"
            id="batch_size"
            name="batch_size"
            value={parameters.batch_size}
            onChange={handleChange}
            className="shadow appearance-none border border-slate-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
    </form>
  );
};


export default YoloTraining;