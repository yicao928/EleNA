import React from 'react'
import "./searchform.css"

export default function SearchForm({center, setCenter}) {
  return (
    <div className='formContainer'>
      Current mark location:
      <span>{center.lat},{center.lng}</span>
    </div>
    
  )
}
