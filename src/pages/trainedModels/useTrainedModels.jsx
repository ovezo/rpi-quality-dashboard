import { useEffect, useState } from 'react';
import useModels from '../new-device/useModels';
import { api } from '../../store/api';

const initialTrainedModels = [
  { title: 'Scratch Detection', dataset: 'Boots UK Boxes', type: 'Anomaly Detection', runningDevices: 3, created_at: '11 August, 2024' },
  { title: 'Box Anomaly Detection', dataset: 'ImageNet', type: 'Anomaly Detection', runningDevices: 2, created_at: '10 August, 2024' },
  { title: 'BoxDetection 2.0', dataset: 'ImageNet', type: 'Anomaly Detection', runningDevices: 1, created_at: '03 June, 2024' },
  { title: 'PrintAnomalyDetect', dataset: 'ImageNet', type: 'Supervised Learning', runningDevices: 0, created_at: '04 June, 2024' },
];

const useTrainedModels = () => {
  const [trainedModels, setTrainedModels] = useState([]);

  useEffect(() => {
    api.get({ url: `${process.env.BACKEND_URL}/train/saved_models/v2` }).then((data, err)=>{
      setTrainedModels([...data.data.map(e => ({...e, created_at: e.created_at * 1000}))]);
    });
  },[]);

  return {
    trainedModels
  };
};


export default useTrainedModels;