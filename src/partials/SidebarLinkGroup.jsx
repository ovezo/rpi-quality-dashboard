import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function SidebarLinkGroup({
  title, 
  activecondition,
  childItems,
  Icon,
  sidebarExpanded,
  link
}) {

  const [open, setOpen] = useState(activecondition);
  const location = useLocation();

  const handleClick = () => {
    setOpen(!open);
  }

  if (link){
    return (
      <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${activecondition && 'bg-slate-900'}`}>
        <NavLink
          end
          to={link}
          className={`block text-slate-200 truncate transition duration-150 ${
            activecondition ? 'hover:text-slate-200' : 'hover:text-white'
          }`}
        >
          <div className="flex items-center">
            <Icon isActive={activecondition} />
            <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">{title}</span>
          </div>
        </NavLink>
      </li>
    )
  }

  return (
    <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${activecondition && 'bg-slate-900'}`}>
      <React.Fragment>
        <a
          href="#0"
          className={`block text-slate-200 truncate transition duration-150 ${activecondition ? 'hover:text-slate-200' : 'hover:text-white'}`}
          onClick={(e) => {
            e.preventDefault();
            handleClick();
            sidebarExpanded(true);
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon isActive={activecondition} />
              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                {title}
              </span>
            </div>
            {/* Icon */}
            <div className="flex shrink-0 ml-2">
              <svg
                className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`}
                viewBox="0 0 12 12"
              >
                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
              </svg>
            </div>
          </div>
        </a>
        <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
          <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
            {
              (childItems||[]).map((item, index) => (
                <li className="mb-1 last:mb-0" key={index}>
                  <NavLink
                    end
                    to={item.link}
                    className={({isActive}) =>
                      'block transition duration-150 truncate ' + (isActive || location.pathname.includes(item.link) ? 'text-indigo-500' : 'text-slate-400 hover:text-slate-200')
                    }
                  >
                    <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      {item.name}
                    </span>
                  </NavLink>
                </li>
              ))
            }
          </ul>
        </div>
      </React.Fragment>
    </li>
  );
}

export default SidebarLinkGroup;