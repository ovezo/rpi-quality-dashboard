const DetectBoxIcon = ({isActive, size, color}) => (
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
      d="M4 8v-2a2 2 0 0 1 2 -2h2"
    />
    <path
      className={`fill-current text-slate-600 dark:text-white`}
      d="M4 16v2a2 2 0 0 0 2 2h2"
    />
    <path
      className={`fill-current text-slate-600 dark:text-white`}
      d="M16 4h2a2 2 0 0 1 2 2v2"
    />
    <path
      className={`fill-current text-slate-600 dark:text-white`}
      d="M16 20h2a2 2 0 0 0 2 -2v-2"
    />
    <path
      className={`fill-current text-slate-600 dark:text-white`}
      d="M12 12.5l4 -2.5"
    />
    <path
      className={`fill-current text-slate-600 dark:text-white`}
      d="M8 10l4 2.5v4.5l4 -2.5v-4.5l-4 -2.5z"
    />
    <path
      className={`fill-current text-slate-600 dark:text-white`}
      d="M8 10v4.5l4 2.5"
    />
  </svg>
);

export default DetectBoxIcon;
