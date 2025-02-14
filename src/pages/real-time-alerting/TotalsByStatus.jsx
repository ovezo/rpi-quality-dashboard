const colorClasses = {
  green: 'bg-green-500 dark:bg-green-400/30 text-white',
  gray: 'bg-gray-200 dark:bg-gray-300/30 text-black',
  red: 'bg-red-500 dark:bg-red-400/30 text-white',
  // Add other colors as needed
};

const TotalsByStatus = ({ label, count, color, type }) => {
  const bgColor = colorClasses[color] || 'text-black';
  const countClass = type === 'bold' ? 'font-bold' : 'font-normal';

  return (
    <label className="relative block cursor-pointer text-left w-full">
      <input type="radio" name="radio-buttons" className="peer sr-only" />
      <div className="p-2 rounded dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm duration-150 ease-in-out">
        <div className="grid grid-cols-12 items-center gap-x-2">
          <div className="col-span-6 order-1 sm:order-none sm:col-span-6 flex items-center space-x-4 lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-6">
            <div className={`text-xs inline-flex font-medium ${bgColor} rounded-full text-center px-2.5 py-1`}>
              {label}
            </div>
          </div>
          <div className="col-span-6 order-1 sm:order-none sm:col-span-6 text-right sm:text-center lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-6">
            <div className={`text-md ${countClass}`}>{count}</div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 dark:peer-checked:border-indigo-500 rounded pointer-events-none" aria-hidden="true" />
    </label>
  );
};

export default TotalsByStatus;
