import React, { useRef, useEffect } from 'react';
import Transition from '../utils/Transition';

function ModalClassic({
  children,
  id,
  title,
  modalOpen,
  className,
  setModalOpen,
  handleSave,
  isForm
}) {

  const modalContent = useRef(null);

  // close on click outside
  // useEffect(() => {
  //   const clickHandler = ({ target }) => {
  //     if (!modalOpen || modalContent.current.contains(target)) return
  //     setModalOpen(false);
  //   };
  //   document.addEventListener('click', clickHandler);
  //   return () => document.removeEventListener('click', clickHandler);
  // });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-black bg-opacity-60 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-auto m-auto justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <FormProvider shouldProvide={isForm} onSubmit={handleSave}>
          <div ref={modalContent} className={"bg-white dark:bg-slate-900 rounded shadow-lg overflow-auto max-w-lg w-full max-h-full "+(className || "")}>
            {/* Modal header */}
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center">
                <div className="font-semibold text-slate-800 dark:text-slate-100">{title}</div>
                <button type='button' className="text-slate-400 dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400" onClick={(e) => { e.stopPropagation(); setModalOpen(false); }}>
                  <div className="sr-only">Close</div>
                  <svg className="w-4 h-4 fill-current">
                    <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Model body */}
            {children}   
            {/* Modal footer */}
            <div className="px-5 py-6 border-t border-slate-200 dark:border-slate-700 mt-8">
              <div className="flex flex-wrap justify-end space-x-2">
                <button type='button' className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" onClick={(e) => setModalOpen(false)}>Cancel</button>
                <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white" type={isForm ? 'submit' : 'button'} onClick={!isForm ? (e)=>{e.stopPropagation(); handleSave()} : null}>Save</button>
              </div>
            </div>  
          </div>        
        </FormProvider>
      </Transition>
    </>
  );
}

const FormProvider = ({shouldProvide, children, onSubmit})=>{
  const onSubmitForm = (e)=> {
    e.preventDefault()
    onSubmit?.()
  }
  if (shouldProvide)
    return(
      <form onSubmit={onSubmitForm} className='w-full justify-center flex'>
        {children}
      </form>
    )
  return children
}

export default ModalClassic;
