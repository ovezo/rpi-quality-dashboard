import { useEffect, useState } from "react";
import ModalBasic from "../../components/ModalBasic";
import { ImageAnnotator, useImageAnnotator } from "react-image-label";
import ClassTag from "./ClassTag";
import {useClasses} from "./useClasses";


const AnnotateImageViewer = ({preview, src, shapes, onSave, onClose }) => {

  const {classes} = useClasses()

  const { setHandles, annotator } = useImageAnnotator();
  const [selectedShape, setSelectedShape] = useState(null)


  const onClassSelected = (cls) => {
    annotator.drawPolygon()
    annotator.updateCategories(selectedShape.id, [cls]);
    setSelectedShape(null)
  }

  const onDelete = () => {
    annotator.drawPolygon()
    annotator.delete(selectedShape.id)
    setSelectedShape(null)
  }

  const onClear = () => {
    if (!annotator)
      return
    annotator.getShapes().forEach(e => {
      annotator.delete(e.id)
    })
  }

  const onAddedShape = (shape) => {
    annotator.stop()
    shape.isNewAdded = true
    setSelectedShape(shape)
  }

  const setShapeColors = () => {
    annotator?.getShapes().forEach(shape => {
      let points = [...shape.points, shape.points[0]].map(p => p.join(',')).join(' ')
      let color = classes.find(e => e.title === shape.categories[0])?.color || 'red'
      if (!color)
        return
      let polygon = annotator.container.querySelector(`polyline[points="${points}"]`)
      polygon?.setAttribute('stroke', color);
    })
  }

  const handleSave = () => {
    onSave({src, shapes: annotator.getShapes()})
  }


  const ActionBar = !preview ?
    (
      <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex flex-wrap justify-end space-x-2 gap-1">
          <button className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" onClick={onClear}>Clear</button>
          <button className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" onClick={onClose}>Cancel</button>
          <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => handleSave()}>Save</button>
        </div>
      </div>
    )
    : null  

  const onContextMenuCaptured = (e) => {
    annotator.stop();
    e.preventDefault()
    annotator.drawPolygon()
  }

  return (
    <div>
      {ActionBar}

      <div className={`${preview ? '' :"px-5 pb-4"} pt-0 w-full h-full relative`}>
        <div className="inline-block" onContextMenuCapture={onContextMenuCaptured}>
          <ImageAnnotator
            setHandles={(e)=>{setHandles(e);}}
            naturalSize={!preview}
            shapes={shapes||[]}
            height={preview ? 'auto' : undefined}
            width={preview ? "180" : undefined}
            imageUrl={src}
            onReady={annotator => { annotator.drawPolygon() }}
            onAdded={(shape) => onAddedShape(shape)} 
            onContextMenu={shape => setSelectedShape(shape)}
          />
        </div>
        {
          selectedShape
          ?
            <ClassesDialog 
              classes={classes}
              offset={selectedShape.getCenterWithOffset()}
              handleSave={onClassSelected}
              handleDelete={onDelete}
              defaultClass={selectedShape.categories[0]}
              isNewAdded={selectedShape.isNewAdded}
              handleCancel={()=>setSelectedShape(null)}
            />
          :
            null
        }
      </div>
      
      {setShapeColors()}
    </div>
  )
}

const ClassesDialog = ({ handleSave, handleDelete, classes, offset, isNewAdded, handleCancel }) => {
  

  return (
    <div className='fixed bg-white max-w-56' style={{top: offset.Y, left: offset.X}} >
      {/* Modal content */}
      <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700">
        <div className="font-semibold text-slate-800 dark:text-slate-100">Select class for the detection</div>
      </div>
      <div className="flex w-full h-full py-2 justify-center">
        {
          classes.map(cls => (
            <ClassTag key={cls.id} title={cls.title} color={cls.color} onClick={()=>handleSave(cls.title)} />
          ))
        }       

      </div>
      {/* Modal footer */}
      <div className="px-5 py-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex flex-wrap justify-center space-x-2">
          {
            !isNewAdded
            &&
            <button className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" onClick={handleCancel}>Cancel</button>
          }
          <button className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  )
}




export default AnnotateImageViewer;