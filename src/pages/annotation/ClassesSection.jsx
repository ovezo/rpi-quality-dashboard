import { useState } from "react";
import CreateClassModal from "./CreateClassModal";
import ImageAnnotation from "./AnnotationSection";
import ClassTag from "./ClassTag";
import {useClasses} from "./useClasses";

const ClassesSection = () => {

  const { classes, addNewClass, updateClass, deleteClass } = useClasses();


  const [edit, setEdit] = useState(null)
  
  const handeEdit = (e, cls) => {
    e?.stopPropagation?.();
    setEdit(cls)
  }

  const onSave = (newClass) => {
    console.log(newClass, "asdasd")
    if (!newClass){
      deleteClass(edit)
    } else if (edit.id)
      updateClass({...edit, ...newClass})
    else
      addNewClass(newClass)

    setEdit(null)
  }

  return (
    <div className="flex flex-col col-span-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      
      <div className="px-5 py-4">
        <div className="md:flex md:justify-between md:items-center">
          {/* Left side */}
          <div className="flex items-center mb-4 md:mb-0">
            {
              classes.map( e => (
                <ClassTag key={e.id} title={e.title} color={e.color} onClick={(event)=>handeEdit(event, e)} />
              ))
            }

          </div>
          {/* Right side */}
          <ul className="shrink-0 flex flex-wrap justify-end md:justify-start -space-x-3 -ml-px">
            <button 
              className="rounded-full btn bg-indigo-500 hover:bg-indigo-600 text-white"
              onClick={(e)=>handeEdit(e, {})}
            >
              Add new class
            </button>
          </ul>
        </div>
      </div>

      <CreateClassModal 
        prevElement={edit} 
        setModalOpen={(e, bool)=>handeEdit(e, bool ? {} : null)} 
        onSave={(newClass)=>onSave(newClass)} 
      />

    </div>         
    
  )
}

export default ClassesSection;

