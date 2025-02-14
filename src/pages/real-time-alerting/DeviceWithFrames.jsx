const preGeneratedFrames = {}

const generateRandomFrames = (index) => {
  if (preGeneratedFrames[index])
    return preGeneratedFrames[index]

  // Define the enum for type
  const types = ["defected", "normal", "undefined"];
  
  // Define an array to hold the generated objects
  const objects = [];
  
  // Generate objects
  for (let i = 0; i < 40; i++) {
    // Randomly choose type from enum
    const type = types[Math.floor(Math.random() * types.length)];
    // Push the object to the array
    objects.push({ type });
  }

  preGeneratedFrames[index] = objects
  
  return objects;
};
const DeviceWithFrames = ({ label, frames, onSelectFrame, selectedFrame }) => {
  console.log(selectedFrame)
  return (
    <div className="py-5 px-5 rounded-xl bg-white dark:bg-slate-800 shadow-sm duration-150 ease-in-out">
      <div className="grid grid-cols-12 items-center gap-x-2">
        <div className="sm:col-span-12 md:col-span-3 order-1 sm:order-none flex items-center space-x-4">
          <div className={`text-md text-slate-800 dark:text-slate-100 font-medium`}>
            {label}
          </div>
        </div>
        <div className="sm:col-span-12 md:col-span-9 order-1 sm:order-none text-right sm:text-center rounded-xl bg-slate-200 dark:bg-slate-900 overflow-hidden px-1">
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${frames.length}, minmax(0, 1fr))`, gap: '0.225rem', alignItems: 'center' }}>
            {
              frames.map((frame, i) => (
                <div 
                  onClick={() => onSelectFrame(frame)} 
                  key={i} 
                  className={`cursor-pointer align-middle ${frame.normal ? "bg-green-700" : 'bg-red-700'} ${frame.id === selectedFrame?.id ? 'h-1.5' : 'h-4'} `}
                ></div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceWithFrames;
