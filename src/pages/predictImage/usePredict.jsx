import { useEffect, useState } from "react";
import { api } from '../../store/api';

var statusCheckInterval;


const usePredict = () => {
  
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState({})
  const [predictingError, setPredictingError] = useState(false)

  const [file, setFile] = useState();

  useEffect(() => {
    return () => {
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
      }
    }
  }, [])

  
  const predictAnomaly = async () => {
    if (!file) {
      setPredictingError('Please upload an image first.');
      return;
    }

    setIsLoading(true)
    setPredictingError('');

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post({url: process.env.BACKEND_URL + "/predict", formData});
      setResult({
        anomalyRate: response.data.anomaly_rate,
        anomalyMap: response.data.anomaly_map,
        heatMap: response.data.heat_map,
        segmentation: response.data.segmentation,
        predMask: response.data.pred_mask,
        originalImage: response.data.original_image
      });
    } catch (error) {
      setPredictingError("Something went wrong! Try again later or try train the model again.")
      console.error("Error during prediction:", error);
    }

    setIsLoading(false)
  };

  return {isLoading, file, setFile, predictingError, result, setResult, predictAnomaly}
}

export default usePredict;