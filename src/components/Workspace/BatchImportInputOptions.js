import styled from 'styled-components'
import { colors } from '../../Theme'
import SpotifyLogoImage from '../../assets/spotify-logo.svg'
import CSVIconImage from '../../assets/csv-icon.svg'
import { useRef, useState } from 'react'

const Container = styled.div`
  margin-top : 20px;
  display : flex;
  flex-direction : column;
  width : 150px;
  margin-left : 45px;
`
const Title = styled.h3`
  color : ${colors.dataRowColor}
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
  const [file, setFile] = useState(null)

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


  const handleSpotifyInput = () =>{
    console.log("HANDLING SPOTIFY INPUT")
  }

  return (
    <Container>
      <Title>Batch Import</Title>
      <Logos>
        <SpotifyLogo src={SpotifyLogoImage} onClick={handleSpotifyInput}/>

        <div>
          <input type="file" onChange={onFileChange} id="file" ref={inputFile} style={{display : "none"}}/>
          <CSVIcon src={CSVIconImage} onClick={() => inputFile.current.click()}/>
        </div>
      </Logos>

    </Container>
  )
}
