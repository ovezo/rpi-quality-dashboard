export default ({isActive, size, color}) => (
  <svg className={`shrink-0 h-${size||6} w-${size||6}`} viewBox="0 0 24 24">
    <path className={`fill-current ${isActive ? 'text-indigo-500' : 'text-slate-500'}`} d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z"></path>
    <path className={`fill-current text-${isActive ? 'indigo' : 'slate'}-600`} d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
    <path className={`fill-current text-${isActive ? 'indigo' : 'slate'}-300`} d="M7 12l4 0"></path>
    <path className={`fill-current text-${isActive ? 'indigo' : 'slate'}-300`} d="M9 10l0 4"></path>
  </svg>
)