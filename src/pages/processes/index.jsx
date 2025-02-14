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
import SelectedTag from './SelectedTag';
import CategoryModal from './CategoryModal';
import useProcesses from './useProcesses';
import CustomTable from '../../components/CustomTable';
import StatusTag from '../../components/StatusTag';
import EmptyTableAddData from '../../components/EmptyTableAddData';
import ProcessModal from './ProcessModal';
import { useNavigate } from 'react-router-dom';
import {useLocations} from '../../context/LocationContext';

const exportTypes = [
  "Stats by defect",
  "Stats by device"
]

const filterOptions = [
  { title: 'Active Processes', value: 'active', method: (row) => row.device === 'ONLINE' },
  { title: 'Requires Attention', value: 'warning', method: (row) => row.device !== "ONLINE" || row.defectRatio > 15},
];

function Processes() {

  const navigate = useNavigate()

  const { user } = useAuth()
  const { setCreateLocation } = useLocations()

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [createProcess, setCreateProcess] = useState(null);
  const [selectedProcess, setSelectedProcess] = useState(null);

  const [ exportType, setExportType ] = useState(exportTypes[0]);

  const [selectedColumns, setSelectedColumns] = useState(tableColumns.map(column => column.key))
  const [selectedFilters, setSelectedFilters] = useState([]);

  const onSelectColumn = (column, isSelected) => {
    if(isSelected){
      setSelectedColumns([...selectedColumns, column])
    }else{
      setSelectedColumns(selectedColumns.filter((c)=>c !== column))
    }
  }

  const onSelectFilter = (filter, isSelected) => {
    if (isSelected) {
      setSelectedFilters([...selectedFilters, filter]);
    } else {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    }
  };

  const checkWithFilter = (process) => {
    if (!selectedFilters.length)
      return true
    console.log(process, selectedFilters)
    let passedFilters = selectedFilters.filter(filterValue => {
      const filter = filterOptions.find(filter => filter.value === filterValue)
      console.info(filter)
      return filter.method(process)
    })
    return passedFilters.length
  }

  const clearAllFilters = () => {
    setSelectedFilters([]);
  };

  const {
    categories, 
    addCategory, 
    addProcess, 
    deleteCategory, 
    editCategory, 
    editProcess, 
    deleteProcess
  } = useProcesses()
  

  const handleEditProcess = (process) => {
    console.log(process)
    setSelectedProcess(process);
    setCreateProcess(process.category_id);
  };

  const handleSaveProcess = (updatedProcess) => {
    if (selectedProcess) {
      editProcess(updatedProcess);
    } else {
      addProcess(updatedProcess);
    }
    setSelectedProcess(null);
    setCreateProcess(null);
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
                <div className='min-w-72'>
                  <DropdownChecklist 
                    title = "Filters"
                    Icon = {<FilterList/>}
                    options={filterOptions.map(option => ({
                      ...option,
                      isSelected: selectedFilters.includes(option.value)
                    }))}
                    onSelect={(value, isSelected) => onSelectFilter(value, isSelected)}
                    onClear={clearAllFilters}
                  />
                </div>
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
                <AddButton onClick={(e)=>{e.stopPropagation(); setCreateLocation(true)}}>Add Location</AddButton>
                <AddButton onClick={(e)=>{e.stopPropagation(); setCategoryModal(true)}}>Add Category</AddButton>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {selectedFilters.map((filter) => (
                <SelectedTag
                  key={filter}
                  title={filterOptions.find(option => option.value === filter).title}
                  onClick={() => onSelectFilter(filter, false)}
                />
              ))}
              {selectedFilters.length > 0 && (
                <TextButton className={"py-0"} onClick={clearAllFilters}>Clear all</TextButton>
              )}
            </div>

            {/* Categories */}
            {categories.map((category, index) => (
              <div key={index} className='mb-14'>
                <div className='mt-6 mb-3'>
                  <div className='flex flex-wrap justify-between items-end'>
                    <h2 className='font-bold text-xl'>{category.title}</h2>
                    <AddButton onClick={(e)=>{e.stopPropagation(); setCreateProcess(category.id);}}>Add Process</AddButton>
                  </div>
                </div>
                {
                  category.processes?.length > 0 ? ( 
                    <CustomTable 
                      data={category.processes.filter( proc => checkWithFilter(proc))} 
                      columns={selectedColumns.length ? tableColumns.filter((column)=>selectedColumns.includes(column.key)) : tableColumns}
                      actions={[
                        // {
                        //   title: 'View',
                        //   onClick: (process) => navigate(`/settings/processes/${process.id}`)
                        // },
                        {
                          title: 'Edit',
                          onClick: (process) => handleEditProcess(process)
                        },
                        {
                          title: 'Delete',
                          onClick: (process) => deleteProcess(process)
                        }
                      ]}
                    />
                  ) : (
                    <EmptyTableAddData  
                      title="Processes" 
                      description="Add the first subprocess for this category."
                      onClick={(e)=>{e.stopPropagation(); setCreateProcess(category.id)}}
                    />
                  )
                }
                
              </div>
            ))}
          </div>
        </main>

      </div>

      <ProcessModal
        isOpen={Boolean(createProcess)}
        category_id={createProcess}
        categories={categories.map(category=>({title: category.title, id: category.id}))}
        triggerModal={(bool) => {
          setCreateProcess(bool ? createProcess : null);
          setSelectedProcess(null);
        }}
        onSave={handleSaveProcess}
        process={selectedProcess}
      />

      <CategoryModal
        isOpen={categoryModal}
        triggerModal={(bool)=>setCategoryModal(bool)}
        onSave={(category)=>addCategory(category)}
      />
    </div>
  );
}

const tableColumns = [
  { key: 'title', title: 'Process' },
  { key: 'location', title: 'Location' },
  { key: 'capacity', title: 'Capacity', render: (value, row) => (`${row.quantity} ${row.per_time}`)},
  { key: 'device', title: 'Device', render: (value) => (
    <StatusTag 
      text={value} 
      status={value=='ONLINE' ? 'success' : value =="OFFLINE" ? 'danger' : value}
    /> 
  )},
  { key: 'machine', title: 'Machines' },
  { key: 'defectRatio', title: 'Defect Ratio', render: (value, row) => (
    <StatusTag 
      text={value ? value + '%' : value} 
      status={Number.parseInt(value) > row.threshold ? 'danger' : Number.parseInt(value) > 0 ? 'success' : undefined}
    /> 
  )},
]

export default Processes;