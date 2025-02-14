import { useEffect, useState } from "react";
import { api } from '../../store/api';
import JSZip from 'jszip';
import useDatasets from "../datasets/useDatasets";

var statusCheckInterval;


const useYoloTraining = () => {
  
  const [isUpLoading, setIsUpLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [trainingCompleted, setTrainingCompleted] = useState(false)
  const [trainedTotalData, setTrainedTotalData] = useState(null)
  const [trainedImages, setTrainedImages] = useState({normal: [], abnormal: [], total_images_size: 0})
  const [trainingError, setTrainingError] = useState(false)
  const [trainingProgress, setTrainingProgress] = useState(0)

  const {addDataset} = useDatasets()

  const [parameters, setParameters] = useState({
    epochs: 1,
    image_size: 640,
    close_mosaic: 100,
    dropout: 0.5,
    batch_size: 64,
  });

  const [zip, setZip] = useState()

  const setFile = async (file) => {
    if (!file) return;

    setZip(file)

    const zip = new JSZip();
    const zipContent = await zip.loadAsync(file);
    const train = [];
    const test = [];
    const valid = [];
    let totalImagesSize = 0


    for (const filename of Object.keys(zipContent.files)) {
      const fileExtension = filename.split('.').pop().toLowerCase();
      if (/^train\/images\/.*\.(dcm|tiff|tif|png|jpe?g|gif|bmp)$/i.test(filename)) {
        const fileData = await zipContent.files[filename].async('blob');
        const fileExtension = filename.split('.').pop().toLowerCase();
        const imageURL = URL.createObjectURL(fileData);        
        train.push({url: imageURL, extension: fileExtension, file: fileData});
        totalImagesSize += fileData.size; // Add the size of this file to the total
      }
      if (/^test\/images\/.*\.(dcm|tiff|tif|png|jpe?g|gif|bmp)$/i.test(filename)) {
        const fileData = await zipContent.files[filename].async('blob');
        const fileExtension = filename.split('.').pop().toLowerCase();
        const imageURL = URL.createObjectURL(fileData);        
        test.push({url: imageURL, extension: fileExtension, file: fileData});
        totalImagesSize += fileData.size; // Add the size of this file to the total
      }
      if (/^valid\/images\/.*\.(dcm|tiff|tif|png|jpe?g|gif|bmp)$/i.test(filename)) {
        const fileData = await zipContent.files[filename].async('blob');
        const fileExtension = filename.split('.').pop().toLowerCase();
        const imageURL = URL.createObjectURL(fileData);        
        valid.push({url: imageURL, extension: fileExtension, file: fileData});
        totalImagesSize += fileData.size; // Add the size of this file to the total
      }
    }

     // Set the total images size in MB
    let imagesSize = (file.size / (1024 * 1024)).toFixed(2)

    setTrainedImages({train: train, test: test, valid: valid, total_images_size: imagesSize})
  };

  useEffect(() => {
    return () => {
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
      }
    }
  }, [])

  const trainModel = async () => {
    if (!zip) {
      setTrainingError('Please upload a zip file first.');
      return;
    }

    const {epochs, image_size, close_mosaic, dropout, batch_size} = parameters

    setIsLoading(false)
    setIsUpLoading(false)
    setTrainingCompleted(false)
    setTrainingError("")
    setTrainingProgress(0)
    try {
      const formData = new FormData();
      formData.append("file", zip);
      formData.append("epochs", epochs );
      formData.append("image_size", image_size );
      formData.append("close_mosaic", close_mosaic );
      formData.append("dropout", dropout );
      formData.append("batch_size", batch_size );
      
      setIsUpLoading(true)
      const response = await api.post({ url: process.env.BACKEND_URL + "/yolo/train", formData })
      setIsLoading(true);

      // Start checking the training status
      checkTrainingStatus();
    } catch (error) {
      console.error("Error during training:", error);
      setIsLoading(false);
      setTrainingError("Training Failed!")
    }
    setIsUpLoading(false)
  }

  const onSaveModel = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.model );
      formData.append("dataset", data.dataset );
      
      const response = await api.post({ url: process.env.BACKEND_URL + "/yolo/save", formData: formData })
      
      data.train = trainedImages.train.length
      data.valid = trainedImages.valid.length
      data.test = trainedImages.test.length
      data.total_images_size = trainedImages.total_images_size
      data.title = data.dataset
      data.type = 'supervised'

      addDataset(data)

    } catch (error) {
      console.error("Error during training:", error);
      setTrainingError("Training Failed!")
    }
  }

  const checkTrainingStatus = () => {
    // Clear any existing interval
    if (statusCheckInterval) {
      clearInterval(statusCheckInterval);
    }

    statusCheckInterval = setInterval(async () => {
      try {
        const response = await api.get({ url: process.env.BACKEND_URL + "/yolo/status" });
        if (response.data.message.startsWith("Training failed")) {
          setTrainingError(response.data.message);
          setIsLoading(false);
          clearInterval(statusCheckInterval);
          return
        }
        if (response.data.is_training) {
          setTrainingCompleted(false);
          setIsLoading(true);
          // let progress = trainingProgress + 5
          // console.log(trainingProgress + 5)
          setTrainingProgress((prev)=>{
            if (prev + 5 < 100 )
              return prev + 2
            else 
              return 99
          })
          return
        }
        if (!response.data.is_training && response.data.result) {
          setTrainedTotalData(response.data.result)
          setTrainingCompleted(true);
          setTrainingProgress(100)
          setIsLoading(false);
          clearInterval(statusCheckInterval);
          return
        }
      } catch (error) {
        console.error("Error checking training status:", error);
        setIsLoading(false);
        setTrainingProgress(0)
        setTrainingError("Training Failed!");
        clearInterval(statusCheckInterval);
        return
      }
    }, 2500); // Check every 5 seconds
  }

  return {
    isLoading,
    setFile,
    trainingError,
    trainingCompleted,
    trainingProgress,
    trainModel,
    trainedTotalData,
    isUpLoading,
    trainedImages,
    onSaveModel,
    parameters,
    setTrainingError,
    setParameters
  }
}

export default useYoloTraining;