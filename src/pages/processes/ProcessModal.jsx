import { useEffect, useState } from "react";
import ModalClassic from "../../components/ModalClassic"
import DropdownClassic from "../../components/DropdownClassic";
import { useDevices } from "../../hooks/useDevices";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import useOperators from "../operators/useOperators";
import useMachines from "../machines/useMachines";
import {useLocations} from "../../context/LocationContext";

const defaultProcess = {
  title: '',
  location: '',
  quantity: '',
  threshold: '',
  per_time: 'per hour',
  operator: '',
  device: '',
  assets: '',
  machine: '',
  device_id: '',
  operator_id: '',
  machine_id: '',
  location_id: '',
  category_id: '',
}

const ProcessModal = ({isOpen, onSave, triggerModal, category_id, categories, process}) => {

  const navigate = useNavigate()

  const {operators} = useOperators()
  const {machines} = useMachines()
  const {devices} = useDevices()
  const {locations, setCreateLocation} = useLocations()

  const [data, setData] = useState({
    ...defaultProcess,
    ...process
  })


  useEffect(() => {
    setData(prevData => ({...prevData, ...defaultProcess, category_id, ...process}))
  }, [category_id, isOpen, process])

  const handleInputChange = (field, value) => {
    setData(prevData => ({...prevData, [field]: value}))
  }

  const handleSave = () => {
    onSave(data)
    triggerModal(false)
  }

  const setModalOpen = (e, bool) => {
    e?.stopPropagation()
    triggerModal(bool)
  }

  return (
    <ModalClassic 
      id="create-process-modal" 
      modalOpen={isOpen} 
      setModalOpen={(bool)=>setModalOpen(null, bool)} 
      title="Add Progress Category"
      handleSave={()=>handleSave(data)}
      isForm
    >
      {/* Modal content */}
      <div className="px-5 py-4">
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Choose category</h2>
          <div>
            <DropdownClassic 
              value={data.category_id}
              fullwidth
              options={categories}
              onSelect={(e)=>handleInputChange('category_id', e)}
            />
          </div>
          
          <h2 className="text-lg font-semibold">General Information</h2>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">Name of the process</label>
            <input
              required
              type="text"
              id="title"
              className="w-full border rounded px-3 py-1.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200"
              value={data.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>

          <div className="flex space-x-2">

            <div className="flex-grow">
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

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="threshold">Threshold</label>
              <input
                required
                type="number"
                id="threshold"
                className="w-full border rounded px-3 py-1.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200"
                value={data.threshold}
                onChange={(e) => handleInputChange('threshold', e.target.value)}
                placeholder="15"
              />
            </div>
          </div>
          
          <div className="flex space-x-2">
            <div className="flex-grow">
              <label className="block text-sm font-medium mb-1" htmlFor="quantity">Quantity</label>
              <input
                required
                type="number"
                id="quantity"
                className="w-full border rounded px-3 py-1.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200"
                value={data.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                placeholder="200 boxes"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="per_time">Time Unit</label>
              <DropdownClassic 
                value={data.per_time}
                options={['per week', 'per day', 'per hour', 'per minute', 'per second']}
                onSelect={(e) => handleInputChange('per_time', e)}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="machine">Machine</label>
            <DropdownClassic 
              value={data.machine_id}
              fullwidth
              actions={[
                {
                  icon: <Add fontSize={"small"}/>,
                  label: 'New Machine',
                  onClick: () => navigate('/settings/machines')
                }
              ]}
              options={machines}
              onSelect={(e) => {
                handleInputChange('machine_id', e)
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="operator">Team</label>
            <DropdownClassic 
              value={data.operator_id}
              fullwidth
              actions={[
                {
                  icon: <Add fontSize={"small"}/>,
                  label: 'New Operator',
                  onClick: () => navigate('/settings/operators')
                }
              ]}
              options={operators}
              onSelect={(e) => {
                handleInputChange('operator_id', e)
              }}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="device">Device</label>
            <DropdownClassic 
              value={data.device_id}
              fullwidth
              actions={[
                {
                  icon: <Add fontSize={"small"}/>,
                  label: 'Add a new device',
                  onClick: () => navigate('/settings/devices')
                }
              ]}
              options={devices.map(e => ({id: e.id, title: e.name}))}
              onSelect={(e) => {
                handleInputChange('device_id', e)
              }}
            />
          </div>
        </div>
      </div>
    </ModalClassic>
  )
}

export default ProcessModal;