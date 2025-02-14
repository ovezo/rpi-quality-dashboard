import React, { useState, useRef, useEffect } from 'react';
import Transition from '../utils/Transition';
import { Add } from '@mui/icons-material';

function DropdownClassic({onSelect, options, value, fullwidth, Icon, isOnlyIcon, actions}) {

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
    <div className={`relative inline-flex ${fullwidth ? 'w-full' : ''}`}>
      <input required type='text' value={value} className='opacity-0 absolute -z-10'/>
      {
        isOnlyIcon ? (
          <button
            type='button'
            ref={trigger}
            className={`rounded-full ${
              dropdownOpen
                ? 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                : 'text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400'
            }`}
            aria-haspopup="true"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
          >
            <span className="sr-only">{value}</span>
            {Icon}
          </button>
        ) : (
          <button
            type='button'
            ref={trigger}
            className={`btn justify-between min-w-44 ${fullwidth ? 'w-full' : ''} bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200`}
            aria-label="Select date range"
            aria-haspopup="true"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
            data-testid="dropdown-classic-button"
          >
            <span className='flex items-center space-x-1'>
              {Icon}
              <span className="flex items-center">
                <span>{options.find(e => (e.id||e) === value)?.title || value || <br/>}</span>
              </span>
            </span>
            <svg className="shrink-0 ml-1 fill-current text-slate-400" width="11" height="7" viewBox="0 0 11 7">
              <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
            </svg>
          </button>
        )
      }
      {
        (options || actions)
        &&
        <Transition
          show={dropdownOpen}
          tag="div"
          className={`z-60 ${isOnlyIcon ? 'right-0' : 'w-full left-0'} absolute top-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded shadow-lg overflow-hidden`}
          enter="transition ease-out duration-100 transform"
          enterStart="opacity-0 -translate-y-2"
          enterEnd="opacity-100 translate-y-0"
          leave="transition ease-out duration-100"
          leaveStart="opacity-100"
          leaveEnd="opacity-0"
        >
          <div
            ref={dropdown}
            className="font-medium text-sm text-slate-600 dark:text-slate-300"
            onFocus={() => setDropdownOpen(true)}
            onBlur={() => setDropdownOpen(false)}
          >
            {
              (actions||[]).map((action, index) => {
                return (  
                  <button
                    type='button'
                    key={index}
                    tabIndex="0"
                    className={`flex items-center w-full hover:bg-slate-50 hover:dark:bg-slate-700/20 py-1 px-3 cursor-pointer border-b border-slate-200 dark:border-slate-700`}
                    onClick={(e) => { e.stopPropagation(); action.onClick(); setDropdownOpen(false); }}
                    data-testid={`dropdown-classic-option_${action.label}`}
                  >
                    {action.icon}
                    <span className='pl-1 my-0.5'>{action.label}</span>
                  </button>
                    
                )
              })
            }
            {
              (options||[]).map((option, index) => {
                return (
                  <button
                    type='button'
                    key={index}
                    tabIndex="0"
                    className={`flex items-center w-full hover:bg-slate-50 hover:dark:bg-slate-700/20 py-1 px-3 cursor-pointer ${(option?.id ?? option) === value && 'text-indigo-500'}`}
                    onClick={(e) => { e.stopPropagation(); onSelect(option?.id ?? option); setDropdownOpen(false); }}
                    data-testid={`dropdown-classic-option_${option?.id ?? option}`}
                  >
                    
                    <span>{option?.title ?? option}</span>
                  </button>
                )
              })
            }
          </div>
        </Transition>
      }
    </div>
  );
}

export default DropdownClassic;
