const BookmarkIcon = ({isActive, size, color}) => (
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
      d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z"
    />
  </svg>
);

export default BookmarkIcon;
