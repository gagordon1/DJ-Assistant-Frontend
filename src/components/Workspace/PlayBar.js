import {useEffect, useState} from 'react'
import styled from 'styled-components'
import {colors} from '../../Theme'

import { CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ProgressBarContainer = styled.div`
  position: absolute;
  width : 60px;
  height : 60px;
  &:hover{
    cursor : pointer;
  }
`

export default function PlayBar(props){

  const [trackProgress, setTrackProgress] = useState(0)
  useEffect(() =>{
    props.audio.addEventListener("timeupdate", ()=>{
      setTrackProgress(100*Number(props.audio.currentTime)/ Number(props.audio.duration))
    })
  })

  const handleClick = (e) =>{
    let targetX = e.currentTarget.offsetLeft + 30
    let targetY = e.currentTarget.offsetTop + 30
    let clickX = e.pageX
    let clickY = e.pageY
    let x = clickX - targetX
    let y = targetY - clickY
    // tan theta = y/x
    let angle = Math.atan2(x, y) * (180 / Math.PI)
    angle = (angle < 0)? 360 + angle : angle
    props.audio.currentTime = angle * props.audio.duration/360

  }

  return(
    <ProgressBarContainer onClick={handleClick}>
      <CircularProgressbar value={trackProgress}/>
    </ProgressBarContainer>
  )
}
