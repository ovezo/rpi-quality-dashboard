import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import usePredict from './usePredict';
import axios from 'axios';


const PredictImage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const { isLoading, file, setFile, predictingError, result, setResult, predictAnomaly } = usePredict()


  const borderStyle = result?.anomalyRate ? (result?.anomalyRate < 0.45 ? 'green' : 'red') : '';

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setUploadedImageUrl(URL.createObjectURL(file));
    setResult({}); // Reset anomaly rate on new image upload
  };


  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 sm:col-span-6 flex items-center">
                <input
                  type="file"
                  onChange={onFileChange}
                  className="w-full btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300"
                />
              </div>
              <div className="col-span-12 sm:col-span-6 flex items-center justify-start sm:justify-end">
                <button disabled={isLoading} onClick={() => predictAnomaly()} className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                  {
                    isLoading
                      ?
                      <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                      </svg>
                      :
                      <svg className="w-4 h-4 fill-current shrink-0 fill-white" viewBox="0 0 16 16">
                        <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                      </svg>
                  }
                  <span className="ml-2">{isLoading ? 'Predicting...' : 'Predict'}</span>
                </button>
              </div>

              {/* Display an error */}
              {
                predictingError
                &&
                <div className="col-span-12">
                  <div className="text-red-500 ml-4">{ predictingError }</div>
                </div>
              }

              {/* Image display with dynamic border color */}
              {result?.originalImage && (
                <div className="col-span-12">
                  <img
                    src={`data:image/png;base64,${result?.originalImage}`}
                    className="border-4"
                    style={{ borderColor: borderStyle, width: '40%', height: 'auto', borderRadius: '10px' }}
                    alt="Uploaded"
                  />
                </div>
              )}

              {/* Anomaly Rate Display */}
              {result?.anomalyRate && (
                <div className="col-span-12">Anomaly Rate: {result?.anomalyRate}</div>
              )}

              {/* Image display with dynamic border color */}
              {result?.anomalyMap && (
                <div className="col-span-6">
                  <img
                    src={`data:image/png;base64,${result?.anomalyMap}`}
                    className="border-4"
                    style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                    alt="Anomaly Map"
                  />
                </div>
              )}
              {result?.heatMap && (
                <div className="col-span-6">
                  <img
                    src={`data:image/png;base64,${result?.heatMap}`}
                    className="border-4"
                    style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                    alt="Heat Map"
                  />
                </div>
              )}
              {result?.predMask && (
                <div className="col-span-6">
                  <img
                    src={`data:image/png;base64,${result?.predMask}`}
                    className="border-4"
                    style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                    alt="Predicted Mask"
                  />
                </div>
              )}
              {result?.segmentation && (
                <div className="col-span-6">
                  <img
                    src={`data:image/png;base64,${result?.segmentation}`}
                    className="border-4"
                    style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                    alt="Segmentation"
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PredictImage;