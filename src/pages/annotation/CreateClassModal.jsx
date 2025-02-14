import { useEffect, useState } from "react";
import ModalBasic from "../../components/ModalBasic";

const CreateClassModal = ({setModalOpen, onSave, prevElement}) => {


  const [title, setTitle] = useState("")
  const [color, setColor] = useState("red")

  const handleSave = () => {
    if (!title){
      return alert("Title is required")
    }
    if (!color){
      return alert("Color is required")
    }
    onSave({title, color})
  }

  useEffect(()=>{
    if (!prevElement)
      return
    setTitle(prevElement.title || '')
    setColor(prevElement.color || 'red')
  }, [prevElement])

  const onSelectColor = (color) => {
    setColor(color)
  }

  return (
    <ModalBasic id="feedback-modal" modalOpen={Boolean(prevElement)} setModalOpen={(bool)=>setModalOpen(null, bool)} title="Create a class">
      {/* Modal content */}
      <div className="px-5 py-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">Name <span className="text-rose-500">*</span></label>
            <input id="name" className="form-input w-full px-2 py-1" type="text" required value={title} onChange={(e)=>setTitle(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">Select a color <span className="text-rose-500">*</span></label>
            <div className="form-input w-full px-2 py-2">
              {
                colorSet.map(clr => (
                  <div 
                    key={clr}
                    onClick={()=>onSelectColor(clr)} 
                    className={`inline-block w-10 h-10 cursor-pointer`}
                    style={color === clr ? {border: `4px solid ${clr}`, padding: 5} : {padding: 8}}
                  >
                    <div className="w-full h-full" style={{backgroundColor: clr}}/>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      {/* Modal footer */}
      <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex flex-wrap justify-end space-x-2">
          <button className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" onClick={(e) => setModalOpen(e, null)}>Cancel</button>
          <button className="btn-sm bg-red-500 hover:bg-red-600 text-white" onClick={()=>onSave()}>Delete</button>
          <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" onClick={()=>handleSave()}>Save</button>
        </div>
      </div>
    </ModalBasic>
  )
}

export default CreateClassModal;


const colorSet = [
	"red",
	"pink",
	"purple",
	"indigo",
	"blue",
	"cyan",
	"teal",
	"green",
	"lime",
	"yellow",
	"orange",
	"brown",
	"grey",
]