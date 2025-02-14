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
import MachineModal from './MachineModal';
import useMachines from './useMachines';
import CustomTable from '../../components/CustomTable';
import StatusTag from '../../components/StatusTag';
import EmptyTableAddData from '../../components/EmptyTableAddData';
import avatar from '../../images/Avatar.png'

function Machines() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [machineModal, setMachineModal] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState(tableColumns.map(column => column.key))
  const [selectedMachine, setSelectedMachine] = useState(null);

  const onSelectColumn = (column, isSelected) => {
    if(isSelected){
      setSelectedColumns([...selectedColumns, column])
    }else{
      setSelectedColumns(selectedColumns.filter((c)=>c !== column))
    }
  }

  const {machines, addMachine, editMachine, deleteMachine} = useMachines()
  
  const handleEditMachine = (machine) => {
    setSelectedMachine(machine);
    setMachineModal(true);
  };

  const handleSaveMachine = (updatedMachine) => {
    if (selectedMachine) {
      editMachine(updatedMachine);
    } else {
      addMachine(updatedMachine);
    }
    setSelectedMachine(null);
    setMachineModal(false);
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
                <AddButton onClick={(e)=>{e.stopPropagation(); setMachineModal(true)}}>Add Machine</AddButton>
              </div>
            </div>

            {/* Machines */}
            <div className='mb-14'>
              {
                machines.length > 0 ? ( 
                  <CustomTable 
                    data={machines} 
                    columns={selectedColumns.length ? tableColumns.filter((column)=>selectedColumns.includes(column.key)) : tableColumns}
                    actions={[
                      {
                        title: 'Edit',
                        onClick: (machine) => handleEditMachine(machine)
                      },
                      {
                        title: 'Delete',
                        onClick: (machine) => deleteMachine(machine)
                      }
                    ]}
                  />
                ) : (
                  <EmptyTableAddData title="Machines" description="Add the first machine to the system."/>
                )
              }                
            </div>
          </div>
        </main>

      </div>

      <MachineModal
        isOpen={machineModal}
        triggerModal={(bool) => {
          setMachineModal(bool);
          if (!bool) setSelectedMachine(null);
        }}
        onSave={handleSaveMachine}
        machine={selectedMachine}
      />

    </div>
  );
}

const tableColumns = [
  { key: 'title', title: 'Machine', render: (value, row) => (
    <div className="flex items-center">
      {console.log("ROW", row)}
      <img src={avatar} alt={value} className="w-8 h-8 mr-2" />
      <span>{value}</span>
    </div>
  )},
  { key: 'ratio', title: 'Ratio', render: (value) => (
    <StatusTag 
      text={value} 
      status={Number(value) > 75 ? 'success' : Number(value) > 75 ? 'warning' : Number(value) > 0 ? 'danger' : undefined}
    />
  )},
  { key: 'serial_number', title: 'Serial Number' },
  { key: 'vendor', title: 'Vendor' },
  { key: 'model', title: 'Model' },
  { key: 'location', title: 'Location' },
  { key: 'process', title: 'Process' },
];


export default Machines;