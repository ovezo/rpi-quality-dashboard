import { useEffect, useState } from 'react';
import { api } from '../../store/api';
import { useAlert } from '../../context/AlertContext';

const useDatasets = () => {
  const [datasets, setDatasets] = useState([]);
  const { showAlert } = useAlert();

  const getDatasets = () => {
    api.get({ url: `datasets` }).then((data, err) => {
      if (data.status == 200) {
        setDatasets([ ...data.data])
      }
    });
  }

  useEffect(()=>{
    getDatasets()
  }, [])

  const addDataset = (dataset) => {
    api.post({ url: `datasets`, body: dataset }).then((data, err) => {
      if (data.status == 200) {
        setDatasets([...data.data])
        showAlert('success', 'Dataset added successfully!')
      } else {
        showAlert('error', 'Failed to add dataset')
      }
    }).catch((error) => {
      console.error("Error adding dataset:", error);
      showAlert('error', 'Failed to add dataset');
    });
  }

  const editDataset = (updatedDataset) => {
    api.put({ url: `datasets/`, body: updatedDataset }).then((data, err) => {
      if (data.status == 200) {
        setDatasets([ ...data.data])
        showAlert('success', 'Dataset updated successfully!')
      } else {
        showAlert('error', 'Failed to update dataset')
      }
    }).catch((error) => {
      console.error("Error updating dataset:", error);
      showAlert('error', 'Failed to update dataset');
    });
  }

  const deleteDataset = (dataset) => {
    api.delete({ url: `datasets/${dataset.id}` }).then((data, err) => {
      if (data.status == 200) {
        setDatasets(datasets.filter(d => d.id !== dataset.id))
        showAlert('success', 'Dataset deleted successfully!')
      } else {
        showAlert('error', 'Failed to delete dataset')
      }
    }).catch((error) => {
      console.error("Error deleting dataset:", error);
      showAlert('error', 'Failed to delete dataset');
    });
  }

  return {
    datasets,
    addDataset,
    editDataset,
    deleteDataset
  };
};

export default useDatasets;