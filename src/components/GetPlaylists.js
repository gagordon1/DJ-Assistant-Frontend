import styled from 'styled-components'
import Popup from 'reactjs-popup'
import { colors } from '../Theme'
import { getPlaylistTracks, getBulkAudioFeatures } from '../controllers/spotify-controller'

const Dialogue = styled.div`
  position: absolute;
  grid-gap : 5px;
  display : grid;
  grid-template-columns: repeat(1, 1fr);
  justify-content : center;
  width: 300px;
  height: 471px;
  margin : auto;
  transform: translate(-50%, -50%);
  background: ${colors.grayOpaque};
  color : white;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
`

const PlaylistImage = styled.img`
  width :50px;
  height :50px;
  margin-right : 10px;
`

const PlaylistContainer = styled.div`
  display : flex;
  flex-direction : row;
  align-items : center;
`

const PlaylistTitle = styled.h4`
  width : 170px;
`

const Button = styled.button`
  &:hover{
    cursor : pointer
  }
`
const Title = styled.h3`
  justify-self : center;
`

function Playlist(props){
  const handleAdd = async () =>{
    console.log(props.playlist.tracksEndpoint)
    let tracks = await getPlaylistTracks(props.accessToken, props.playlist.tracksEndpoint)
    let newData = {}
    tracks.forEach(obj => {
      if(obj.track && obj.track.id){
        newData[obj.track.id] = {
          artist : obj.track.artists[0].name,
          title : obj.track.name,
        }

      }
        
    }
      
    )
    let audioFeatures = await getBulkAudioFeatures(props.accessToken, Object.keys(newData))
    audioFeatures.forEach(obj => {
      if (obj){
        newData[obj.id].key = obj.key
        newData[obj.id].mode = obj.mode
        newData[obj.id].bpm = obj.tempo
      }
      
    })
    props.setOpen(false)
    console.log(newData)
    props.setData(Object.keys(newData).map(key => newData[key]))
  }
  return(
    <PlaylistContainer>
      <PlaylistImage src={props.playlist.image}/>
      <PlaylistTitle>{props.playlist.name}</PlaylistTitle>
      <Button onClick={handleAdd}>
        <label> Add </label>
      </Button>

    </PlaylistContainer>
  )
}


export default function GetPlaylists(props){

  return(
    <div>
      <Popup open={props.open} onClose={() => props.setOpen(false)}>

        <Dialogue>
          <Title> Import Spotify Playlist </Title>
          <div style ={{overflowY : "scroll"}}>
            {props.playlists.map((playlist,i) => <Playlist key={i} accessToken={props.accessToken}
                    setData={props.setData} setOpen={props.setOpen} playlist={playlist}/>)}
          </div>
        </Dialogue>

      </Popup>
    </div>

  )
}
