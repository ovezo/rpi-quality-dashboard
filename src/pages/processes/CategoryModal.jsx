import { useState } from "react";
import ModalClassic from "../../components/ModalClassic"

const CategoryModal = ({isOpen, onSave, triggerModal}) => {

  const [title, setTitle] = useState("")
  
  const setModalOpen = (e, bool) => {
    e?.stopPropagation()
    triggerModal(bool)
  }

  const handleSave = () => {
    onSave({title})
    triggerModal(false)
  }

  return (
    <ModalClassic 
      id="create-category-modal" 
      modalOpen={isOpen} 
      setModalOpen={(bool)=>setModalOpen(null, bool)} 
      title="Add Progress Category"
      handleSave={handleSave}
      isForm
    >
      {/* Modal content */}
      <div className="px-5 py-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
            <input
              required
              type="text"
              id="name"
              className="w-full border rounded px-3 py-1.5 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />
          </div>
        </div>
      </div>
    </ModalClassic>
  )
}

export default CategoryModal;