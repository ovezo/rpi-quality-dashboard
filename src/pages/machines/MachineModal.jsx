import { useEffect, useState } from "react";
import ModalClassic from "../../components/ModalClassic"
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DropdownClassic from "../../components/DropdownClassic";
import {useLocations} from "../../context/LocationContext";

const defaultMachine = {
  title: "",
  serial_number: "",
  vendor: "",
  model: "",
  location: "",
}

const MachineModal = ({isOpen, onSave, triggerModal, machine}) => {
  
  const navigate = useNavigate();
  const { locations } = useLocations();

  const [data, setData] = useState({
    ...defaultMachine,
    ...machine
  })

  useEffect(()=>{
    if (machine) 
      setData(machine)
    else {
      setData(defaultMachine)
    }
  }, [machine])

  const handleInputChange = (field, value) => {
    setData(prevData => ({...prevData, [field]: value}))
  }
  
  const setModalOpen = (e, bool) => {
    e?.stopPropagation()
    triggerModal(bool)
  }

  const handleSave = () => {
    onSave(data)
    triggerModal(false)
  }

  return (
    <ModalClassic 
      id="create-category-modal" 
      modalOpen={isOpen} 
      setModalOpen={(bool)=>setModalOpen(null, bool)} 
      title="Add Machine"
      handleSave={handleSave}
      isForm
    >
      {/* Modal content */}
      <div className="px-5 py-4">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">General Information</h2>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Title {/*<span className="text-rose-500">*</span>*/}
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full border rounded px-3 py-1.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200"
              value={data.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="serial_number">
              Serial Number {/*<span className="text-rose-500">*</span>*/}
            </label>
            <input
              type="text"
              id="serial_number"
              name="serial_number"
              className="w-full border rounded px-3 py-1.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200"
              value={data.serial_number}
              onChange={(e) => handleInputChange('serial_number', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="vendor">
              Vendor {/*<span className="text-rose-500">*</span>*/}
            </label>
            <input
              type="text"
              id="vendor"
              name="vendor"
              className="w-full border rounded px-3 py-1.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200"
              value={data.vendor}
              onChange={(e) => handleInputChange('vendor', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="model">
              Model {/*<span className="text-rose-500">*</span>*/}
            </label>
            <input
              type="text"
              id="model"
              name="model"
              className="w-full border rounded px-3 py-1.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200"
              value={data.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
              required
            />
          </div>          

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="location">Location</label>
            <DropdownClassic 
              value={data.location_id}
              fullwidth
              actions={[
                {
                  icon: <Add fontSize={"small"}/>,
                  label: 'New Location',
                  onClick: () => setCreateLocation(true)
                }
              ]}
              options={locations}
              onSelect={(e) => {
                handleInputChange('location_id', e)
              }}
            />
          </div>
        </div>
      </div>
    </ModalClassic>
  )
}

export default MachineModal;