import React from "react";
import { NavLink } from "react-router-dom";
import DropdownClassic from "./DropdownClassic";
import { MoreHoriz } from "@mui/icons-material";

const CustomTable = ({data, columns, actionLink, actions}) => {
  return (
    <div className="py-5 px-5 rounded-xl bg-white dark:bg-slate-800 shadow-sm duration-150 ease-in-out">
      <div>
        <table className="table-auto w-full dark:text-slate-100">
          {/* Table header */}
          <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-left">#</div>
              </th>
              {columns.map((column) => (
                <th key={column.key} className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">{column.title}</div>
                </th>
              ))}
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
              </th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
            {
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <CustomCell value={rowIndex + 1} />
                  {columns.map((column) => (
                    <CustomCell key={column.key} value={row[column.key]} render={column.render} row={row} />
                  ))}
                  {
                    actions && (
                      <CustomCell 
                        value={
                          <DropdownClassic
                            isOnlyIcon={true}
                            Icon={
                              <MoreHoriz/>
                            }
                            options={actions.map((action)=>action.title)}
                            onSelect={(value)=>actions.find((action)=>action.title === value)?.onClick?.(row)}
                          />
                            // <button className="text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 rounded-full">
                            //   <span className="sr-only">Menu</span>
                            //   <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                            //     <circle cx="16" cy="16" r="2" />
                            //     <circle cx="10" cy="16" r="2" />
                            //     <circle cx="22" cy="16" r="2" />
                            //   </svg>
                            // </button> 
                        } 
                      /> 
                    )
                  }
                </tr>
              ))
            }
          </tbody>
        </table>

      </div>
    </div>
  );
}


const CustomCell = ({value, render, row}) => (
  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
    {
      typeof value === 'string' && value.match(/\.(jpeg|jpg|gif|png)$/) !== null ? (
        <div className="flex items-center">
          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
            <img className="rounded-full" src={value} width="40" height="40" alt={row.name || ''} />
          </div>
          <div className="font-medium text-slate-800 dark:text-slate-100">{row.name}</div>
        </div>
      ) : render ? (
        render(value, row)
      ) : (
        <div className="text-left">{value}</div>
      )
    }
  </td>
)

export default CustomTable;