import { useEffect, useState } from "react";
import ModalClassic from "../../components/ModalClassic"
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DropdownClassic from "../../components/DropdownClassic";
import { useLocations } from "../../context/LocationContext";

const defaultOperator = {
  title: "",
  responsible: "",
  process: "",
  location: "",
}

const OperatorModal = ({isOpen, onSave, triggerModal, operator}) => {
  
  const navigate = useNavigate();
  const { locations, setCreateLocation } = useLocations();

  const [data, setData] = useState({
    ...defaultOperator,
    ...operator
  })

  useEffect(() => {
    if (operator) 
      setData(operator)
    else {
      setData(defaultOperator)
    }
  }, [operator])

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
      id="create-operatoe-modal" 
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
            <label className="block text-sm font-medium mb-1" htmlFor="title">Name of the unit</label>
            <input
              required
              type="text"
              id="title"
              className="w-full border rounded px-3 py-1.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200"
              value={data.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="responsible">Responsible Person</label>
            <input
              required
              type="text"
              id="responsible"
              className="w-full border rounded px-3 py-1.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200"
              value={data.responsible}
              onChange={(e) => handleInputChange('responsible', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="process">Process</label>
            <input
              required
              type="text"
              id="process"
              className="w-full border rounded px-3 py-1.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200"
              value={data.process}
              onChange={(e) => handleInputChange('process', e.target.value)}
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

export default OperatorModal;