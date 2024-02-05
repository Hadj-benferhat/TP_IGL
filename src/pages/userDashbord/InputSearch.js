import React from 'react'

const InputSearch = (
    {type, placeholder, id, value,setValue}
    ) => {
  return (
      <input type={type} 
      role='searchBox'
      id={id}
      placeholder={placeholder}
      value={value}
     onChange={(e)=>setValue(e.target.value)}
      />
  )
}

export default InputSearch
