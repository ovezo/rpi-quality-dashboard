const SkipForwardIcon = ({isActive, size, color}) => (
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
      d="M4 5v14l12 -7z"
    />
    <path
      className={`fill-current text-slate-600 dark:text-white`}
      d="M20 5v14"
    />
  </svg>
);

export default SkipForwardIcon;
