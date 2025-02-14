import React from 'react';

import UserImage01 from '../../images/icon.png';

function DirectMessages({
  setMsgSidebarOpen
}) {
  return (
    <div className="mt-4">
      <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase mb-3">Direct messages</div>
      <ul className="mb-6">
        <li className="-mx-2">
          <button className="flex items-center justify-between w-full p-2 rounded bg-indigo-500/30" onClick={() => setMsgSidebarOpen(false)}>
            <div className="flex items-center truncate">
              <img className="w-8 h-8 rounded-full mr-2" src={UserImage01} width="32" height="32" alt="User 01" />
              <div className="truncate">
                <span className="text-sm font-medium text-slate-800 dark:text-slate-100">Robominder Assistant</span>
              </div>
            </div>
            <div className="flex items-center ml-2">
              <div className="text-xs inline-flex font-medium bg-indigo-400 text-white rounded-full text-center leading-5 px-2">2</div>
            </div>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default DirectMessages;