import React from 'react'
import './ShowVideoGrid.css'
import ShowVideo from '../ShowVideo/ShowVideo'
const ShowVideoGrid = ({vids}) => {
  return (
    <div className='Container_ShowVideoGrid'>
    {
      vids?.reverse().map(vi=>
        {
            return (
                <div key={vi._id} className="video_box_app">
                    <ShowVideo vid={vi}/>
                </div>
            )
        })  
    }
</div>
  )
}

export default ShowVideoGrid