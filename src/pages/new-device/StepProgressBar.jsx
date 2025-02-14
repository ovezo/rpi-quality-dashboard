const StepProgressBar = ({ step, children }) => (
  <>
    <div className="px-4 pb-12">
      <div className="max-w-md mx-auto w-full">
        <div className="relative">
          <div className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-slate-200 dark:bg-slate-700" aria-hidden="true"></div>
          <ul className="relative flex justify-between w-full">
            {
              children.map( (_, e) => (
                <StepItem key={e} stepNum={e+1} isActive={e <= step} />
              ))
            }
            
          </ul>
        </div>
      </div>
    </div>
    {children[step]}
  </>
)

const StepItem = ({stepNum, isActive}) => (
  <li>
    <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${isActive ? 'bg-indigo-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>{stepNum}</span>
  </li>
)

export default StepProgressBar;