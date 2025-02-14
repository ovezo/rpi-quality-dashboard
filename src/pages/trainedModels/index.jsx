import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import DropdownChecklist from '../../components/DropdownChecklist';
import AddButton from '../../components/buttons/AddButton';
import { UploadOutlined, ViewColumnOutlined } from '@mui/icons-material';
import TextButton from '../../components/buttons/TextButton';
import CustomTable from '../../components/CustomTable';
import EmptyTableAddData from '../../components/EmptyTableAddData';
import useTrainedModels from './useTrainedModels';
import { Link, NavLink } from 'react-router-dom';

function TrainedModels() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modelModal, setModelModal] = useState(false);

  const { trainedModels, addTrainedModel } = useTrainedModels();

  const [selectedColumns, setSelectedColumns] = useState(tableColumns.map(column => column.key));
  const onSelectColumn = (column, isSelected) => {
    if (isSelected) {
      setSelectedColumns([...selectedColumns, column]);
    } else {
      setSelectedColumns(selectedColumns.filter((c) => c !== column));
    }
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
                    options={tableColumns.map((column) => ({
                      title: column.title,
                      value: column.key,
                      isSelected: selectedColumns.includes(column.key)
                    }))}
                    onSelect={(value, isSelected) => onSelectColumn(value, isSelected)}
                    onClear={() => setSelectedColumns([])}
                  />
                </div>
              </div>
              <div className="grid grid-flow-col justify-end sm:justify-end gap-2">
                <TextButton Icon={<UploadOutlined/>}>Export</TextButton>
                <Link to="/quality-control/training"><AddButton >Train new model</AddButton></Link>
              </div>
            </div>

            <div className='mb-14'>
              {trainedModels.length > 0 ? ( 
                <CustomTable 
                  data={trainedModels} 
                  columns={selectedColumns.length ? tableColumns.filter((column) => selectedColumns.includes(column.key)) : tableColumns}
                />
              ) : (
                <EmptyTableAddData title="Trained Models" description="Train your first model."/>
              )}                
            </div>
          </div>
        </main>
      </div>

      {/* TODO: Implement TrainModelModal component */}
      {/* <TrainModelModal
        isOpen={modelModal}
        triggerModal={(bool) => setModelModal(bool)}
        onSave={(model) => addTrainedModel(model)}
      /> */}
    </div>
  );
}

const tableColumns = [
  { key: 'title', title: 'Model Name' },
  { key: 'dataset', title: 'Dataset Name' },
  { key: 'type', title: 'Model Type', render: (val) => val === 'supervised' ? 'Supervised Learning' : val === 'unsupervised' ?  'Anomaly Detection' : val },
  { key: 'runningDevices', title: 'Running Devices', render: (val) => val || 0 },
  { key: 'created_at', title: 'Trained date', render: (val) => new Date(val).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) }
];

export default TrainedModels;