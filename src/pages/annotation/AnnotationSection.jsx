import { useState } from "react"
import ImageSelector from "./ImageSelector"
import AnnotateImageViewer from "./AnnotateImageViewer"
import ImageCard from "./ImageCard"
import useAnnotation from "./useAnnotation"
const tabs = ["All Images", "Annotated", "Not Annotated"]

const AnnotationSection = () => {

  const {addNewImages, images, deleteImage, updateImage} = useAnnotation()

  const [activeTab, setActiveTab] = useState("All Images")
  
  const [activeImage, setActiveImage] = useState()

  const handleSelectedFiles = (files) => {
    addNewImages(files)
  }

  const handleDelete = (image) => {
    deleteImage(image)
  }

  const handleImageClick = (img) => {
    setActiveImage(img)
  }

  const handleSaveAnnotation = (annotatedImage) => {
    updateImage({...activeImage, shapes: annotatedImage.shapes})
    setActiveImage(null)
  }

  return (
    <div className="px-5 flex flex-col col-span-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">

      <div className="py-4">
        <div className="md:flex md:justify-between md:items-center">
          {/* Left side */}
          <div className="flex items-center mb-4 md:mb-0 w-full">

            <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-0">Annotate</h2>

          </div>
          {/* Right side */}
          <ul className="shrink-0 flex flex-wrap justify-end md:justify-start -space-x-3 -ml-px">
            {
              activeImage
              ?
              null
              :
              <ImageSelector onSelectedImages={(files)=>handleSelectedFiles(files)} />
            }
          </ul>
        </div>
      </div>

      {
        activeImage
        ?
          <AnnotateImageViewer 
            src={activeImage.url} 
            shapes={activeImage.shapes} 
            isOpen={Boolean(activeImage)}
            onClose={()=>setActiveImage(null)} 
            onSave={handleSaveAnnotation} 
          />
        :
          <div>
            <div className="mt-3">
              <Tabs active={activeTab} onChange={(tab)=>setActiveTab(tab)} />
            </div>

            <div className="grid grid-cols-12 gap-3 pb-5">
              {
                images.filter(e => activeTab === 'Annotated' ? e.shapes?.length : activeTab === 'Not Annotated' ? !e.shapes?.length : true)
                  .map((img, i) => (
                    <ImageCard
                    key={img.id}
                    img={img}
                    isAnnotated={img.shapes.length}
                    onClearAnnotations={()=>updateImage({...img, shapes: []})}
                    onDelete={()=>handleDelete(img)}
                    onImageSelect={(e)=>{e.stopPropagation();handleImageClick(img)}}
                  />
                  ))
              }
            </div>
          </div>
      }
    </div>
  )
}

const Tabs = ({ active, onChange }) => {
  return (
    < div >
      {/* Start */}
      <div className="relative mb-8">
        <div className="absolute bottom-0 w-full h-px bg-slate-200 dark:bg-slate-700" aria-hidden="true"></div>
        <ul className="relative text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
          {
            tabs.map(tab => (
              <li key={tab} onClick={()=>onChange(tab)} className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8 cursor-pointer">
                <span className={`block pb-3 whitespace-nowrap ${tab === active ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>{tab}</span>
              </li>
            ))
          }
          {/* <li className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
            <a className="block pb-3 text-indigo-500 whitespace-nowrap border-b-2 border-indigo-500" href="#0">All</a>
          </li> */}
        </ul>
      </div>
      {/* End */}
    </div >
  )
}

export default AnnotationSection;