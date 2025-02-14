import { useState } from "react";
import DatasetModal from "./DatasetModal";

export default function({onSave}){
  const [isModalOpen, setModalOpen] = useState(false)

  const _onSave = (data) => {
    onSave?.(data)
    setModalOpen(false);
  }

  return (
    <div className="m-1.5 inline-block text-left">
      {/* Start */}
      <button className="btn h-8 bg-green-500 hover:bg-green-600 text-white" aria-controls="feedback-modal" onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}>Save model</button>
      <DatasetModal
        isOpen={isModalOpen}
        onSave={_onSave}
        triggerModal={setModalOpen}
      />
      {/* End */}
    </div>
  )
}