import styled from 'styled-components'
import { colors } from '../../Theme'
import DownloadIconImage from '../../assets/download-icon.png'
import { useState } from 'react'
import { YOUTUBE_VIDEO_BASE_URL} from '../../config'
import { getDownloadLink } from '../../backend-calls'
import Waveform from './Waveform'



const TrackContainer = styled.div`
  display : flex;
  justify-content : center;
  width : 500px;
  height : 80%;
  background : ${colors.dataRowColor};
  margin-left : 20px;
  margin-right : 20px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  align-items : center;
`
const DownloadIcon = styled.img`
  height : 20px;
  width : auto;
  &: hover{
    cursor : pointer;
  }
`



export default function Track(props){

  const [link, setLink] = useState("")
  const [loading, setLoading] = useState(false)



  const handleDownload= async () =>{
    setLoading(true)
    const result = await getDownloadLink(YOUTUBE_VIDEO_BASE_URL + props.id)
    setLink(result)
    setLoading(false)
    let audio = new Audio(result)
    audio.play()
  }

  return (
    <TrackContainer>
      {(props.id && !link)? <DownloadIcon src={DownloadIconImage} onClick={handleDownload}/> : null}
      {loading? <div> Loading... </div> : null}
      {link? <a>Got link</a> : null}

    </TrackContainer>
  )
}
