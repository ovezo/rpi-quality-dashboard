export default function ClassTag ({title, color, onClick}) {
  return <button onClick={onClick} className={`rounded-full btn hover:opacity-80 text-white mx-1`} style={{backgroundColor: color}}>{title}</button>
}