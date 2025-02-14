import React, { useEffect, useState } from 'react';
import ModalClassic from "../../../components/ModalClassic"

function DatasetModal({ isOpen, triggerModal, onSave, dataset }) {
  const [data, setData] = useState({
    model: '', 
    dataset: '',
    description: '',
    ...dataset
  });

  useEffect(() => {
    if (dataset) {
      setData(dataset)
    } else {
      setData({ model: '', dataset: '', description: ''})
    }
  }, [dataset])

  const handleInputChange = (field, value) => {
    setData(prevData => ({...prevData, [field]: value}))
  }
  
  const handleSave = () => {
    if (data.model && data.dataset && data.description) {
      onSave(data);
      triggerModal(false);
      setData({ model: '', dataset: '', description: '' });
    }
  };

  return (
    <ModalClassic 
      id="create-operatoe-modal" 
      modalOpen={isOpen} 
      setModalOpen={(bool)=>triggerModal(null, bool)} 
      title="Add New Dataset"
      handleSave={handleSave}
      isForm
    >      
      {/* Modal content */}
      <div className="px-5 py-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="model">Name of the Model</label>
            <input
              type="text"
              id="model"
              className="w-full border rounded px-3 py-1.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200"
              value={data.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="dataset">Name of the Dataset</label>
            <input
              type="text"
              id="dataset"
              className="w-full border rounded px-3 py-1.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200"
              value={data.dataset}
              onChange={(e) => handleInputChange('dataset', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
            <textarea
              id="description"
              className="w-full border rounded px-3 py-1.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200"
              rows="4"
              value={data.description}
              required
              onChange={(e) => handleInputChange('description', e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </ModalClassic>
  );
}

export default DatasetModal;