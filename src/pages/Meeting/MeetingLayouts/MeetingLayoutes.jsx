import React from 'react'
import MeetingNavbar from '../MeetingNavbar/MeetingNavbar'
import MeetingFunctionpage from '../MeetingFunctionPages/MeetingFunctionpage'
import { Outlet } from 'react-router-dom'

function MeetingLayoutes() {
  return (
    <div >
      <MeetingNavbar />
      <div className='mt-16 lg:mt-20'>
        <Outlet />
      </div>
    </div>
  )
}

export default MeetingLayoutes