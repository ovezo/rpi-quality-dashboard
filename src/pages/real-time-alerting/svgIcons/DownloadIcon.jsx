const DownloadIcon = ({isActive, size, color}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 h-${size||6} w-${size||6}`}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path
      className={`fill-current text-slate-600 dark:text-white`}
      d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"
    />
    <path
      className={`fill-current text-slate-600 dark:text-white`}
      d="M7 11l5 5l5 -5"
    />
    <path
      className={`fill-current text-slate-600 dark:text-white`}
      d="M12 4v12"
    />
  </svg>
);

export default DownloadIcon;
