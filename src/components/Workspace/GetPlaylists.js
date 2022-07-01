import styled from 'styled-components'
import Popup from 'reactjs-popup';
import Track from './Track'
import { useState } from 'react'
import { getPlaylists } from '../../controllers/spotify-controller';
import { getTopGenres } from '../comparison-analysis'

const Button = styled.button`
  position : relative;
  font-family : inherit;
  margin-top : 40px;;
  margin-bottom: auto;
  width: 270px;
  height: 50px;
  background: rgba(85, 85, 85, 0.05);
  border : none;
  &:hover{
    cursor : pointer;
    filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
  }
  &:active{
    box-shadow: 0 0px rgba(0, 0, 0, 0.25);
    transform: translateY(2px);
  }
`
const Button2 = styled.button`
  justify-self : center;
  font-family : inherit;
  width : 100%;
  height: 50px;
  background: rgba(85, 85, 85, 0.05);
  border : none;
  &:hover{
    cursor : pointer;
    filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
  }
  &:active{
    box-shadow: 0 0px rgba(0, 0, 0, 0.25);
    transform: translateY(2px);
  }
`
const ButtonLabel = styled.h3`

  margin-top: auto;
  margin-bottom : auto;
`

const Dialogue = styled.div`
  position: absolute;
  grid-gap : 20px;
  display : grid;
  grid-template-columns: repeat(1, 1fr);
  justify-content : center;
  width: 300px;
  height: 471px;
  margin : auto;
  transform: translate(-50%, -50%);
  background: #F5F5F5;
  opacity: 0.9;
`

const TrackScroller = styled.div`
  overflow-y : scroll;
`

const ButtonContainer = styled.div`
  display : grid;
  grid-template-columns: repeat(2, 1fr);
`

function randomChoice(arr) {
    let index = Math.floor(arr.length * Math.random())
    return arr[index];
}


export default function GetPlaylists(props){

  const [open, setOpen] = useState(false)
  const [playlists, setPlaylists] = useState([])

  const generateBlendPlaylist = async () =>{
    const recs = await getPlaylists(props.accessToken)
    setPlaylists(recs)
    //user
    setOpen(true)
  }

  return(
    <div>
      <Button onClick={() => generateBlendPlaylist()}>
        <ButtonLabel>Generate Blend Playlist</ButtonLabel>
      </Button>
      <Popup open={open} onClose={() => setOpen(false)}>
        <Dialogue>
          <ButtonContainer>
            <Button2 onClick={() => setOpen(false)}>
              <ButtonLabel>Cancel</ButtonLabel>
            </Button2>
            <Button2 onClick={()=>{}}>
              <ButtonLabel>Add to Library</ButtonLabel>
            </Button2>
          </ButtonContainer>
          <TrackScroller>
          </TrackScroller>
        </Dialogue>

      </Popup>
    </div>

  )
}
