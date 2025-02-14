export default ({className, children, Icon, ...props}) => {
  return (
    <button {...props} className={"btn bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200 "+(className||'')}>
      {Icon}
      <span className="ml-2">{children}</span>
    </button>
  )
}