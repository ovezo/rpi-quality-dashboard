import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import Datepicker from '../../components/Datepicker';
import DropdownClassic from '../../components/DropdownClassic';
import { useDevices } from '../../hooks/useDevices';
import { CSVLink } from "react-csv";
import { useAuth } from '../../context/AuthContext';
import DropdownChecklist from '../../components/DropdownChecklist';
import AddButton from '../../components/buttons/AddButton';
import { Close, FilterList, Upload, UploadOutlined, ViewColumnOutlined} from '@mui/icons-material';
import TextButton from '../../components/buttons/TextButton';
import OperatorModal from './OperatorModal';
import useOperators from './useOperators';
import CustomTable from '../../components/CustomTable';
import StatusTag from '../../components/StatusTag';
import EmptyTableAddData from '../../components/EmptyTableAddData';


function Operators() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [operatorModal, setOperatorModal] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState(null);

  const {operators, addOperator, editOperator, deleteOperator} = useOperators();

  const [selectedColumns, setSelectedColumns] = useState(tableColumns.map(column => column.key))
  const onSelectColumn = (column, isSelected) => {
    if(isSelected){
      setSelectedColumns([...selectedColumns, column])
    }else{
      setSelectedColumns(selectedColumns.filter((c)=>c !== column))
    }
  }
  
  const handleEditOperator = (operator) => {
    setSelectedOperator(operator);
    setOperatorModal(true);
  };

  const handleSaveOperator = (updatedOperator) => {
    if (selectedOperator) {
      editOperator(updatedOperator);
    } else {
      addOperator(updatedOperator);
    }
    setSelectedOperator(null);
    setOperatorModal(false);
  };

  return (
    <div className="flex h-[100dvh] overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Dashboard actions */}
            <div className="sm:flex sm:space-between sm:items-right mb-5 justify-between">
              <div className="grid grid-flow-col justify-start sm:justify-end gap-2">
                <div className='min-w-52'>
                  <DropdownChecklist 
                    title = "Columns"
                    Icon = {<ViewColumnOutlined/>}
                    options = {tableColumns.map((column)=>({
                      title: column.title,
                      value: column.key,
                      isSelected: selectedColumns.includes(column.key)
                    }))}
                    onSelect={(value, isSelected)=>onSelectColumn(value, isSelected)}
                    onClear={()=>setSelectedColumns([])}
                  />
                </div>
              </div>
              <div className="grid grid-flow-col justify-end sm:justify-end gap-2">
                <TextButton Icon={<UploadOutlined/>}>Export</TextButton>
                <AddButton onClick={(e)=>{e.stopPropagation(); setOperatorModal(true)}}>Add Operator</AddButton>
              </div>
            </div>

            {/* Operators */}
            <div className='mb-14'>
              {
                operators.length > 0 ? ( 
                  <CustomTable 
                    data={operators} 
                    columns={selectedColumns.length ? tableColumns.filter((column)=>selectedColumns.includes(column.key)) : tableColumns}
                    actions={[
                      {
                        title: 'Edit',
                        onClick: (operator) => handleEditOperator(operator)
                      },
                      {
                        title: 'Delete',
                        onClick: (operator) => deleteOperator(operator)
                      }
                    ]}
                  />
                ) : (
                  <EmptyTableAddData title="Operators" description="Add the first operator to the system." onClick={(e)=>{e.stopPropagation(); setOperatorModal(true)}}/>
                )
              }                
            </div>
          </div>
        </main>

      </div>

      <OperatorModal
        isOpen={operatorModal}
        triggerModal={(bool) => {
          setOperatorModal(bool);
          if (!bool) setSelectedOperator(null);
        }}
        onSave={handleSaveOperator}
        operator={selectedOperator}
      />

    </div>
  );
}

const tableColumns = [
  { key: 'title', title: 'Name of the Unit'},
  { key: 'ratio', title: 'Ratio', render: (value) => (
    <StatusTag 
      text={value} 
      status={Number(value) > 75 ? 'success' : Number(value) > 75 ? 'warning' : Number(value) > 0 ? 'danger' : undefined}
    />
  )},
  { key: 'responsible', title: 'Responsible' },
  { key: 'location', title: 'Location' },
  { key: 'process', title: 'Process' },
];


export default Operators;