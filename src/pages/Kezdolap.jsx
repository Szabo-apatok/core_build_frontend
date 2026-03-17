import { useState } from 'react'
import logo from '../assets/Core_build-no-bg.png'
import hatter from '../assets/Core_build_background.gif'

import '../style.css'

function Kezdolap() {
  return (
    <>
    <div className="form-container"/>
    
      <img src={logo} className="logo" alt="Logo" />
      <img src={hatter} className="body-background" alt="Background" />
      <h1 className='KezdolapCim'>ʙᴜɪʟᴅɪɴɢ ᴛʜᴇ ꜰᴜᴛᴜʀᴇ, ᴏɴᴇ ʟɪɴᴇ ᴀᴛ ᴀ ᴛɪᴍᴇ</h1>
      <a href='/login'><button className='Gomb'>KEZDD EL AZ ÉPÍTÉST</button></a>
    </>
  )
}

export default Kezdolap