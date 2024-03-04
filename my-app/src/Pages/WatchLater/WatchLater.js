import React from 'react'
import { useSelector } from 'react-redux';

import WHL from '../../components/WHL/WHL';
const WatchLater = () => {
  const watchLaterList= useSelector(state=>state.watchLaterReducer)
  return (
    <WHL page={"Watch Later"} videoList={watchLaterList}/>
  )
}

export default WatchLater