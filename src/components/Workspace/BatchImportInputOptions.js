import styled from 'styled-components'
import { colors } from '../../Theme'
import SpotifyLogoImage from '../../assets/spotify-logo.svg'
import CSVIconImage from '../../assets/csv-icon.svg'
import SpotifyLogoImageHighlighted from '../../assets/spotify-logo-highlighted.svg'
import CSVIconImageHighlighted from '../../assets/csv-icon-highlighted.svg'
import { useRef, useState } from 'react'
import GetPlaylists from './GetPlaylists'
import { getPlaylists } from '../../controllers/spotify-controller';

const Container = styled.div`
  display : flex;
  flex-direction : column;
  width : 250px;
`
const Title = styled.h3`
  color : ${colors.white};
  margin-bottom : 0px
`
const Logos = styled.div`
  display : flex;
  flex-direction : row;
  margin-left : auto;
  margin-right : auto;
`
const CSVIcon = styled.img`
  width : 40px;
  height : auto;
  &:hover{
    cursor : pointer
  }
`
const SpotifyLogo = styled.img`
  width : 30px;
  height : auto;
  &:hover{
    cursor : pointer
  }
`
export default function BatchImportInputOptions(props){

  const inputFile = useRef(null)
  const [open, setOpen] = useState(false)
  const [playlists, setPlaylists] = useState([])

  const onFileChange = (e) =>{
    let file = e.target.files[0]
    const reader = new FileReader();
    reader.onload = function (event) {
      const text = event.target.result
      const searches = text.split("\r\n")
      props.batchSearch(searches)
    };
    reader.readAsText(file)
  }


  const handleSpotifyInput = async () =>{
    try{
      let result = await getPlaylists(props.accessToken)
      setPlaylists(result.items.map(obj => {return{
          name : obj.name,
          image : obj.images.length > 0? obj.images[0].url : "",
          tracksEndpoint : obj.tracks.href
        }})
      )
      setOpen(true)
    }catch(error){
      alert("Expired access token. Log out then log back in.")
    }

  }
  return (
    <Container>
      <Title>Batch Import Tracks</Title>
      <Logos>
        <SpotifyLogo src={SpotifyLogoImage} onMouseOut={e => e.currentTarget.src = SpotifyLogoImage}
          onMouseOver={e => e.currentTarget.src = SpotifyLogoImageHighlighted} onClick={handleSpotifyInput}/>
        <GetPlaylists accessToken={props.accessToken} batchSearch={props.batchSearch}
          playlists={playlists} setOpen={setOpen} open={open}/>
        <div>
          <input type="file" accept=".csv" onChange={onFileChange} id="file" ref={inputFile} style={{display : "none"}}/>
          <CSVIcon src={CSVIconImage} onClick={() => inputFile.current.click()}
            onMouseOut={e => e.currentTarget.src = CSVIconImage}
            onMouseOver={e => e.currentTarget.src = CSVIconImageHighlighted}
            />
        </div>
      </Logos>

    </Container>
  )
}
