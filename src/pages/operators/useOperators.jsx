import { useEffect, useState } from "react";
import { api } from "../../store/api/index";
import { useAlert } from "../../context/AlertContext";

const defaultOperators = [
  {
    title: 'Team 1 - Cutting Operators',
    ratio: 92,
    responsible: 'John Doe',
    location: 'C0-A1',
    process: 'Packaging → Labelling',
  },
  {
    title: 'Team 2 - Cutting Operators',
    ratio: 64,
    responsible: 'John Doe',
    location: 'C0-A1',
    process: 'Bicycle → Welding',
  }
]

const useOperators = () => {
  const [operators, setOperators] = useState([])
  const { showAlert } = useAlert();

  const getOperators = () => {
    api.get({ url: `operators` }).then((data, err) => {
      if (data.status == 200) {
        setOperators([...defaultOperators, ...data.data])
      }
    });
  }

  useEffect(() => {
    getOperators()
  }, [])

  const addOperator = (operator) => {
    api.post({ url: `operators`, body: operator }).then((data, err) => {
      if (data.status == 200) {
        setOperators([...defaultOperators,...data.data])
        showAlert('success', 'Operator added successfully!')
      } else {
        showAlert('error', 'Failed to add operator')
      }
    }).catch((error) => {
      console.error("Error adding operator:", error);
      showAlert('error', 'Failed to add operator');
    });
  }

  const editOperator = (updatedOperator) => {
    api.put({ url: `operators/`, body: updatedOperator }).then((data, err) => {
      if (data.status == 200) {
        setOperators([...defaultOperators, ...data.data])
        showAlert('success', 'Operator updated successfully!')
      } else {
        showAlert('error', 'Failed to update operator')
      }
    }).catch((error) => {
      console.error("Error updating operator:", error);
      showAlert('error', 'Failed to update operator');
    });
  }

  const deleteOperator = (operator) => {
    api.delete({ url: `operators/${operator.id}` }).then((data, err) => {
      if (data.status == 200) {
        setOperators(operators.filter(o => o.id !== operator.id))
        showAlert('success', 'Operator deleted successfully!')
      } else {
        showAlert('error', 'Failed to delete operator')
      }
    }).catch((error) => {
      console.error("Error deleting operator:", error);
      showAlert('error', 'Failed to delete operator');
    });
  }

  return {operators, addOperator, editOperator, deleteOperator}
}

export default useOperators;