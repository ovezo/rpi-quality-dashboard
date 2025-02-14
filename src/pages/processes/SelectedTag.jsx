import { Close } from "@mui/icons-material";

const SelectedTag = ({title, onClick}) => (
  <div className='text-sm font-semibold rounded-full py-1 px-3 space-x-1 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 dark:text-slate-300'>
    <span>{title}</span>
    {
      onClick
      &&
      <button onClick={onClick} className='hover:text-slate-800 dark:hover:text-slate-50'><Close fontSize='small'/></button>
    }
  </div>
)

export default SelectedTag;