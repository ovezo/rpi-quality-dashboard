import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import DropdownChecklist from '../../components/DropdownChecklist';
import AddButton from '../../components/buttons/AddButton';
import { UploadOutlined, ViewColumnOutlined } from '@mui/icons-material';
import TextButton from '../../components/buttons/TextButton';
import CustomTable from '../../components/CustomTable';
import EmptyTableAddData from '../../components/EmptyTableAddData';
import useDatasets from './useDatasets';
import DatasetModal from './DatasetModal';
import { Link, NavLink } from 'react-router-dom';

function Datasets() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [datasetModal, setDatasetModal] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState(null);

  const { datasets, addDataset, editDataset, deleteDataset } = useDatasets();

  const [unsupervisedSelectedColumns, setSelectedUnsupervisedColumns] = useState(unsupervisedTableColumns.map(column => column.key));
  const onSelectUnsupervisedColumn = (column, isSelected) => {
    if (isSelected) {
      setSelectedUnsupervisedColumns([...unsupervisedSelectedColumns, column]);
    } else {
      setSelectedUnsupervisedColumns(unsupervisedSelectedColumns.filter((c) => c !== column));
    }
  };

  const [supervisedSelectedColumns, setSelectedSupervisedColumns] = useState(supervisedTableColumns.map(column => column.key));
  const onSelectSupervisedColumn = (column, isSelected) => {
    if (isSelected) {
      setSelectedSupervisedColumns([...supervisedSelectedColumns, column]);
    } else {
      setSelectedSupervisedColumns(supervisedSelectedColumns.filter((c) => c !== column));
    }
  };

  const handleEditDataset = (dataset) => {
    setSelectedDataset(dataset);
    setDatasetModal(true);
  };

  const handleSaveDataset = (updatedDataset) => {
    if (selectedDataset) {
      editDataset(updatedDataset);
    } else {
      addDataset(updatedDataset);
    }
    setSelectedDataset(null);
    setDatasetModal(false);
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:space-between sm:items-right mb-5 justify-between">
              <div className="grid grid-flow-col justify-start sm:justify-end gap-2">
                <div className='min-w-52'>
                  <DropdownChecklist 
                    title="Columns"
                    Icon={<ViewColumnOutlined/>}
                    options={unsupervisedTableColumns.map((column) => ({
                      title: column.title,
                      value: column.key,
                      isSelected: unsupervisedSelectedColumns.includes(column.key)
                    }))}
                    onSelect={(value, isSelected) => onSelectUnsupervisedColumn(value, isSelected)}
                    onClear={() => setSelectedUnsupervisedColumns([])}
                  />
                </div>
              </div>
              <div className="grid grid-flow-col justify-end sm:justify-end gap-2">
                <TextButton Icon={<UploadOutlined/>}>Export</TextButton>
                <Link to="/quality-control/training"><AddButton>New Dataset</AddButton></Link>
              </div>
            </div>

            <div className='mb-14'>
              {datasets.length > 0 ? ( 
                <CustomTable 
                  data={datasets.filter(e => e.type === 'unsupervised')} 
                  columns={unsupervisedSelectedColumns.length ? unsupervisedTableColumns.filter((column) => unsupervisedSelectedColumns.includes(column.key)) : unsupervisedTableColumns}
                  actions={[
                    {
                      title: 'Edit',
                      onClick: (dataset) => handleEditDataset(dataset)
                    },
                    {
                      title: 'Delete',
                      onClick: (dataset) => deleteDataset(dataset)
                    }
                  ]}
                />
              ) : (
                <EmptyTableAddData title="Datasets" description="Add the first dataset to the system."/>
              )}                
            </div>


            <div className="sm:flex sm:space-between sm:items-right mb-5 justify-between">
              <div className="grid grid-flow-col justify-start sm:justify-end gap-2">
                <div className='min-w-52'>
                  <DropdownChecklist 
                    title="Columns"
                    Icon={<ViewColumnOutlined/>}
                    options={supervisedTableColumns.map((column) => ({
                      title: column.title,
                      value: column.key,
                      isSelected: supervisedSelectedColumns.includes(column.key)
                    }))}
                    onSelect={(value, isSelected) => onSelectSupervisedColumn(value, isSelected)}
                    onClear={() => setSelectedSupervisedColumns([])}
                  />
                </div>
              </div>
            </div>

            <div className='mb-14'>
              {datasets.length > 0 ? ( 
                <CustomTable 
                  data={datasets.filter(e => e.type !== 'unsupervised')} /////////////////////////
                  columns={supervisedSelectedColumns.length ? supervisedTableColumns.filter((column) => supervisedSelectedColumns.includes(column.key)) : supervisedTableColumns}
                  actions={[
                    {
                      title: 'Edit',
                      onClick: (dataset) => handleEditDataset(dataset)
                    },
                    {
                      title: 'Delete',
                      onClick: (dataset) => deleteDataset(dataset)
                    }
                  ]}
                />
              ) : (
                <EmptyTableAddData title="Datasets" description="Add the first dataset to the system."/>
              )}                
            </div>
            
          </div>
        </main>
      </div>

      <DatasetModal
        isOpen={datasetModal}
        triggerModal={(bool) => {
          setDatasetModal(bool);
          if (!bool) setSelectedDataset(null);
        }}
        onSave={handleSaveDataset}
        dataset={selectedDataset}
      />
    </div>
  );
}

const supervisedTableColumns = [
  { key: 'title', title: 'Dataset Name' },
  { key: 'description', title: 'Description' },
  { key: 'total_images_size', title: 'Size', render: (val) => val ? val+'MB' : val },
  { key: 'train', title: 'Train set' },
  { key: 'valid', title: 'Valid set' },
  { key: 'test', title: 'Test set' },
  { key: 'updated_at', title: 'Last updated date', render: (val) => new Date(val).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) },
];

const unsupervisedTableColumns = [
  { key: 'title', title: 'Dataset Name' },
  { key: 'description', title: 'Description' },
  { key: 'total_images_size', title: 'Size', render: (val) => val ? val+'MB' : val },
  { key: 'normal', title: 'Normal set' },
  { key: 'abnormal', title: 'Abnormal set' },
  { key: 'updated_at', title: 'Last updated date', render: (val) => new Date(val).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) },
];


export default Datasets;