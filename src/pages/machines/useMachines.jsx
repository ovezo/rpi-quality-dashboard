import { useEffect, useState } from "react";
import { api } from "../../store/api/index";
import { useAlert } from "../../context/AlertContext";

const defaultMachines = [
  {
    title: 'ER-4iA (UNEDITABLE)',
    image: '/path/to/robot-er-4ia-image.png',
    ratio: 92,
    serial_number: 'BVYCS4XG22Z3SC9NW',
    vendor: 'FANUC',
    location: 'C0-A1',
    process: 'Packaging → Labelling',
  },
  {
    title: 'ER-4iA (HARDCODED)',
    image: '/path/to/arc-mate-50id-7l-image.png',
    ratio: 64,
    serial_number: 'CNT9U5AT7KZPFHLGF',
    vendor: 'FANUC',
    location: 'C0-A1',
    process: 'Bicycle → Welding',
  }
]

const useMachines = () => {
  const [machines, setMachines] = useState([])
  const { showAlert } = useAlert();

  const getMachines = () => {
    api.get({ url: `machines` }).then((data, err) => {
      if (data.status == 200) {
        setMachines([...defaultMachines, ...data.data])
        console.log("MACHINES", [...machines, data.data])
      }
    });
  }

  useEffect(() => {
    getMachines()
  }, [])

  const addMachine = (machine) => {
    api.post({ url: `machines`, body: machine }).then((data, err) => {
      if (data.status == 200) {
        setMachines([...machines, ...data.data])
        showAlert('success', 'Machine added successfully!')
      } else {
        showAlert('error', 'Failed to add machine')
      }
    }).catch((error) => {
      console.error("Error adding machine:", error);
      showAlert('error', 'Failed to add machine');
    });
  }

  const editMachine = (updatedMachine) => {
    api.put({ url: `machines/`, body: updatedMachine }).then((data, err) => {
      if (data.status == 200) {
        setMachines([...defaultMachines, ...data.data])
        showAlert('success', 'Machine updated successfully!')
      } else {
        showAlert('error', 'Failed to update machine')
      }
    }).catch((error) => {
      console.error("Error updating machine:", error);
      showAlert('error', 'Failed to update machine');
    });
  }

  const deleteMachine = (machine) => {
    api.delete({ url: `machines/${machine.id}` }).then((data, err) => {
      if (data.status == 200) {
        setMachines(machines.filter(m => m.id !== machine.id))
        showAlert('success', 'Machine deleted successfully!')
      } else {
        showAlert('error', 'Failed to delete machine')
      }
    }).catch((error) => {
      console.error("Error deleting machine:", error);
      showAlert('error', 'Failed to delete machine');
    });
  }

  return {machines, addMachine, editMachine, deleteMachine}
}

export default useMachines;