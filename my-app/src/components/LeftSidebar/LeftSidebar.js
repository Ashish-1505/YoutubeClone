import React from 'react'
import {AiOutlineHome} from "react-icons/ai"
import {MdSubscriptions,MdVideoLibrary,MdExplore} from "react-icons/md"
import './LeftSidebar.css'
import shorts from './shorts.png'
import {NavLink}from "react-router-dom"
const LeftSidebar = () => {
  return (
    <div className='container_leftSidebar'>
    <NavLink to={'/'} className='icon_sidebar_div' >
        <AiOutlineHome size={22} className="icon_sidebar"/>
        <div className="text_sidebar_icon">Home</div>
    </NavLink>
    <div className='icon_sidebar_div' >
            <MdExplore size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Explore</div>
        </div>
        <div className='icon_sidebar_div' >
            <img src={shorts} width={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Shorts</div>
        </div>
        <div className='icon_sidebar_div' >
            <MdSubscriptions size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon" style={{fontSize:"12px"}}>Subcriptions</div>
        </div>
        <NavLink to={'/library'} className='icon_sidebar_div' >
            <MdVideoLibrary size={22} className="icon_sidebar"/>
            <div className="text_sidebar_icon">Library</div>
        </NavLink>
</div>
  )
}

export default LeftSidebar