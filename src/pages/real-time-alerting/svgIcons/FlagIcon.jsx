const FlagIcon = ({isActive, size, color}) => (
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
      d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9z"
    />
    <path
      className={`fill-current text-slate-600 dark:text-white`}
      d="M5 21v-7"
    />
  </svg>
);

export default FlagIcon;
