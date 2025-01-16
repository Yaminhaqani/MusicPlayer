import React from 'react'
import UseAuth from '../utils/UseAuth'



const Protected = () => {

  UseAuth();

  return (
    <div>Protected</div>
  )
}

export default Protected