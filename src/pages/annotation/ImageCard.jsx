import { Link } from "react-router-dom";
import AnnotateImageViewer from "./AnnotateImageViewer";

const ImageCard = ({img, onDelete, onImageSelect, isAnnotated, onClearAnnotations}) => (
  <div className="relative col-span-full sm:col-span-4 xl:col-span-2 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 group cursor-pointer">
    <div onClick={onImageSelect} className="flex flex-col h-full">
      {/* Card top */}
      <div className="grow">
        {/* <AnnotateImageViewer preview width={"100%"} src={img.src} shapes={img.shapes} /> */}
        <img src={img.url}  height={120}/>
      </div>
      {/* Card footer */}
    </div>

    {
      isAnnotated
      ?
      <div className="absolute left-1 bottom-1 bg-white/40 dark:bg-slate-700 rounded-full shadow">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-7 h-7 inline fill-current text-orange-500 " 
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
          <path d="M4 16v2a2 2 0 0 0 2 2h2" />
          <path d="M16 4h2a2 2 0 0 1 2 2v2" />
          <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
          <path d="M12 12.5l4 -2.5" />
          <path d="M8 10l4 2.5v4.5l4 -2.5v-4.5l-4 -2.5z" />
          <path d="M8 10v4.5l4 2.5" />
        </svg>  
      </div>
      :
      null
    }

    <div className="absolute top-1 right-1 bg-white/80 dark:bg-slate-700 rounded-full shadow hidden group-hover:block px-1" aria-hidden="true">
      {
        isAnnotated
        ?
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-7 h-7 inline fill-current text-orange-500 hover:text-orange-700 p-1" 
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={()=>onClearAnnotations()} 
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M4 8v-2c0 -.557 .228 -1.061 .595 -1.424" />
          <path d="M4 16v2a2 2 0 0 0 2 2h2" />
          <path d="M16 4h2a2 2 0 0 1 2 2v2" />
          <path d="M16 20h2c.558 0 1.062 -.228 1.425 -.596" />
          <path d="M12 12.5l.312 -.195m2.457 -1.536l1.231 -.769" />
          <path d="M9.225 9.235l-1.225 .765l4 2.5v4.5l3.076 -1.923m.924 -3.077v-2l-4 -2.5l-.302 .189" />
          <path d="M8 10v4.5l4 2.5" />
          <path d="M3 3l18 18" />
        </svg>
        :
        null
      }
      <svg 
        className="w-7 h-7 inline fill-current text-red-500 hover:text-red-700 p-1" 
        xmlns="http://www.w3.org/2000/svg"  
        viewBox="0 0 24 24"
        onClick={()=>onDelete()} 
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" strokeWidth="0" fill="currentColor" />
        <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" strokeWidth="0" fill="currentColor" />
      </svg>
    </div>


  </div>
)

export default ImageCard;