import { useEffect, useState } from "react";
import { api } from "../../store/api/index";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";

const defaultCategories = [
  {
    id: -1,
    title: "Cutting and shaping",
    processes: [
      { 
        title: "Material Cutting", 
        location: "C0-A1", 
        quantity: "200",
        per_time: "per hour",
        device: "Setup",
        machine: "Robot ER-41A", 
        defectRatio: "",
        threshold: 15
      },
      { 
        title: "Tube Cutting", 
        location: "F1-JJ2", 
        quantity: "250",
        per_time: "per hour",
        device: "ONLINE",
        machine: "ARC Mate 50iD/7L", 
        defectRatio: 23,
        threshold: 15
      },
      { 
        title: "Sheet Metal Cutting", 
        location: "F1-JJ2", 
        quantity: "100",
        per_time: "per hour",
        device: "ONLINE",
        machine: "ARC Mate 100iD • Cutting Operators", 
        defectRatio: 12,
        threshold: 15
      },
      { 
        title: "Tube Bending", 
        location: "CO-1", 
        quantity: "100",
        per_time: "per hour",
        device: "OFFLINE",
        machine: "ARC Mate 100iD", 
        defectRatio: 10,
        threshold: 15
      },
    ]
  }
]

const useProcesses = () => {

  const { showAlert } = useAlert();
  const [categories, setCategories] = useState([])

  const getCategories = () => {
    api.get({ url: `categories` })
      .then((data) => {
        if (data.status == 200) {
          setCategories([...defaultCategories, ...data.data])
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        showAlert('error', 'Failed to load categories');
      });
  }

  useEffect(()=>{
    getCategories()
  }, [])

  const addCategory = (category) => {
    api.post({ url: `categories`, body: category })
      .then((data) => {
        if (data.status == 200) {
          setCategories([...defaultCategories, ...data.data])
          showAlert('success', 'Category added successfully!')
        } else {
          showAlert('error', 'Failed to add category')
        }
      })
      .catch((error) => {
        console.error("Error adding category:", error);
        showAlert('error', 'Failed to add category');
      });
  }

  const editCategory = (updatedCategory) => {
    api.put({ url: `categories/`, body: updatedCategory })
      .then((data) => {
        if (data.status == 200) {
          setCategories([...defaultCategories, ...data.data])
          showAlert('success', 'Category updated successfully!')
        } else {
          showAlert('error', 'Failed to update category')
        }
      })
      .catch((error) => {
        console.error("Error updating category:", error);
        showAlert('error', 'Failed to update category');
      });
  }

  const deleteCategory = (category) => {
    api.delete({ url: `categories/${category.id}` })
      .then((data) => {
        if (data.status == 200) {
          setCategories(categories.filter(c => c.id !== category.id))
          showAlert('success', 'Category deleted successfully!')
        } else {
          showAlert('error', 'Failed to delete category')
        }
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        showAlert('error', 'Failed to delete category');
      });
  }

  const addProcess = (process) => {
    api.post({ url: `processes`, body: process })
      .then((data) => {
        if (data.status == 200) {
          showAlert('success', 'Process added successfully!')
          setCategories(categories.map(c => c.id === process.category_id ? {...c, processes: data.data} : c))
        } else {
          showAlert('error', 'Failed to add process')
        }
      })
      .catch((error) => {
        console.error("Error adding process:", error);
        showAlert('error', 'Failed to add process');
      });
  };

  const editProcess = (updatedProcess) => {
    api.put({ url: `processes`, body: updatedProcess })
      .then((data) => {
        if (data.status == 200) {
          setCategories(categories.map(c => c.id === updatedProcess.category_id ? {...c, processes: data.data} : c))
          showAlert('success', 'Process updated successfully!')
        } else {
          showAlert('error', 'Failed to update process')
        }
      })
      .catch((error) => {
        console.error("Error updating process:", error);
        showAlert('error', 'Failed to update process');
      });
  };

  const deleteProcess = (process) => {
    api.delete({ url: `processes/${process.id}` })
      .then((data) => {
        if (data.status == 200) {
          showAlert('success', 'Process deleted successfully!')
          setCategories(categories.map(c => c.id === process.category_id ? {...c, processes: c.processes.filter(p => p.id !== process.id)} : c))
        } else {
          showAlert('error', 'Failed to delete process')
        }
      })
      .catch((error) => {
        console.error("Error deleting process:", error);
        showAlert('error', 'Failed to delete process');
      });
  }

  return { categories, addCategory, addProcess, deleteCategory, editCategory, editProcess, deleteProcess};
}

export default useProcesses;