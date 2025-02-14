const DateTimePickerRange = ({dateRange, setDateRange}) => {
  
  const onChange = (key, value) => {
    let obj = {...dateRange}
    obj[key] = value.replace('T', ' ')
    setDateRange(obj)
  }
  
  const startDate = dateRange.startDate.replace(' ', 'T')
  const endDate = dateRange.endDate.replace(' ', 'T')

  return (
    <span>
      <input
        style={{ padding: 22 }}
        type="datetime-local"
        aria-label="Date and time"
        className="datetime-input-start"
        value={startDate}
        onBlur={() => console.log("blur")}
        onChange={(event) => { onChange('startDate', event.target.value) }}
      />

      <input
        style={{ padding: 22 }}
        type="datetime-local"
        aria-label="Date and time"
        className="datetime-input-end"
        value={endDate}
        onChange={(event) => { onChange('endDate', event.target.value) }}
      />
    </span>
  )
}

export default DateTimePickerRange