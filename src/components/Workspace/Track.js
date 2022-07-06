import styled from 'styled-components'
import { colors } from '../../Theme'
import DownloadIconImage from '../../assets/download-icon.svg'
import { useState, useEffect } from 'react'
import { YOUTUBE_VIDEO_BASE_URL} from '../../config'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { TailSpin } from  'react-loader-spinner'
import PlayButtonImage from '../../assets/play_button.svg'
import PauseButtonImage from '../../assets/pause_button.svg'
import PlayBar from './PlayBar'

const TrackContainer = styled.div`
  display : flex;
  position : relative;
  justify-content : center;
  align-items : center;
  width : 128px;
  height : 72px;
  margin-left : 10px;
  margin-right : 10px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  background-size : contain;

`

const TrackBackground = styled.img`
  display : ${props => props.display};
  width : inherit;
  height : inherit;
  ${TrackContainer}:hover &{
    filter : brightness(50%);
  }
`

const DownloadIcon = styled.img`
  position : absolute;
  height : 20px;
  width : auto;
  &: hover{
    cursor : pointer;
  }
`
const PlayButton = styled.img`
  height : 30px;
  width : auto;
  position : absolute;
  display : none;
  ${TrackContainer}:hover &{
    display: flex;
  }
`

const PauseButton = styled.img`
  height : 30px;
  width : auto;
  position : absolute;
  display : ${props => props.display};
  &: hover{
    cursor : pointer;
  }
`

const Loader = styled.div`
  position : absolute;
`


export default function Track(props){
  const [loading, setLoading] = useState(false)
  const [playing, setPlaying] = useState(false)

  const togglePlay = () =>{
    if(props.audio.src !== props.link.replace(/\s/g, "%20")){//fixes bug where src white space turns to %20
      props.audio.src = props.link
      props.setAudioSource(props.link)
      props.audio.load()
      props.audio.play()
      setPlaying(true)
    } else{
      playing? props.audio.pause() : props.audio.play()
      setPlaying(!playing)
    }
  }

  const handleDownload= async () =>{
    setLoading(true)
    try{
      const result = await props.getDownloadLink(YOUTUBE_VIDEO_BASE_URL + props.id)
      props.handleSet(props.index, props.attribute, result)
    }catch(error){
      alert("Could not download link. Ensure the selected content is not longer than 10 minutes.")
    }

    setLoading(false)
  }

  useEffect(()=>{
    if(props.link && props.audioSource !== props.link){
      setPlaying(false)
    }
  }, [props.audioSource, props.link])

  useEffect(()=>{
      if(props.link && props.audioSource === props.link){
        props.audio.pause()
        setPlaying(false)
      }
  }, [props.id]) //when id changes lets turn playing off


  return (
    <TrackContainer>
      <TrackBackground display ={props.thumbnail? "block" : "none"} src={props.thumbnail}/>
      {(props.link && playing)?<PlayBar key={props.link} audio={props.audio}/> : null}
      {(props.link && !playing)? <PlayButton src={PlayButtonImage} onClick={togglePlay}/> : null}
      {(props.link && playing)?<PauseButton src={PauseButtonImage} onClick={togglePlay}/> : null}
      {(props.id && !props.link && !loading)? <DownloadIcon src={DownloadIconImage} onClick={handleDownload}/> : null}
      {loading? 	<Loader><TailSpin color={colors.white} height={20} width={20} /> </Loader>: null}


    </TrackContainer>
  )
}
