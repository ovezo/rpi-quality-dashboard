import React from 'react';

function TotalsCard({header, value}) {

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-3 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 py-5">
        <header>
          <h3 data-testid={`total-card-header_${header}`} className="text-sm font-semibold text-slate-500 uppercase mb-1">
            {header}
          </h3>
          <div data-testid={`total-card-value_${value}`} className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">{value}</div>
        </header>
      </div>
    </div>
  );
}

export default TotalsCard;
