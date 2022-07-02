import styled from 'styled-components'
import Popup from 'reactjs-popup'
import { colors } from '../../Theme'
import { getPlaylistTracks } from '../../controllers/spotify-controller'

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
  background: ${colors.dataRowColor};00000
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
    let tracks = await getPlaylistTracks(props.accessToken, props.playlist.tracksEndpoint)

    let searches = tracks.items.filter(obj => obj.track !== null).map(obj => obj.track.name + " " + obj.track.artists.map(obj => obj.name).join(", "))
    props.setOpen(false)
    props.batchSearch(searches)
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
          <div style ={{overflow : "scroll"}}>
            {props.playlists.map((playlist,i) => <Playlist key={i} accessToken={props.accessToken}
                    batchSearch={props.batchSearch} setOpen={props.setOpen} playlist={playlist}/>)}
          </div>
        </Dialogue>

      </Popup>
    </div>

  )
}
