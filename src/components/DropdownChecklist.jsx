import React, { useState, useRef, useEffect } from 'react';
import Transition from '../utils/Transition';

function DropdownChecklist({
  align,
  title,
  Icon,
  options,
  onSelect,
  onClear
}) {

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative inline-flex w-full">
      <button
        ref={trigger}
        className="btn w-full justify-between bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className='flex flex-wrap items-center'>
          {Icon}
          <span className="flex items-center px-2">
            <span>{title}</span>
          </span>
        </span>
        <svg className="shrink-0 ml-1 fill-current text-slate-400" width="11" height="7" viewBox="0 0 11 7">
          <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
        </svg>
      </button>
      <Transition
        show={dropdownOpen}
        tag="div"
        className={`origin-top-right z-10 absolute top-full left-0 w-full right-auto min-w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pt-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === 'right' ? 'md:left-auto md:right-0' : 'md:left-0 md:right-auto'
        }`}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div ref={dropdown}>
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase pt-1.5 pb-2 px-3">{title}</div>
          <ul className="mb-4">
            {options.map((option, index) => (
              <li key={index} className="py-1 px-3">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox" checked={option.isSelected} onChange={(e)=>onSelect(option.value, e.target.checked)} />
                  <span className="text-sm font-medium ml-2">{option.title}</span>
                </label>
              </li>
            ))}
          </ul>
          <div className="py-2 px-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/20">
            <ul className="flex items-center justify-between">
              <li>
                <button className="btn-xs bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 dark:text-slate-300 hover:text-slate-600 dark:hover:text-slate-200" onClick={onClear}>
                  Clear
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownChecklist;
