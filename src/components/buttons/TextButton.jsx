export default ({className, children, Icon, ...props}) => {
  return (
    <button {...props} className={"btn text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-200 shadow-none "+(className||'')}>
      {Icon}
      <span className="hidden xs:block">{children}</span>
    </button>
  )
}