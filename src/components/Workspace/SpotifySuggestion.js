import styled from 'styled-components'
import { colors } from '../../Theme'

const TrackInfo = styled.div`
  display : flex;
  height : 100%;
  width : 128px;
  flex-direction : column;
  margin-top: auto;
  margin-bottom : auto;
  text-align : center;
  justify-content : center;
  padding-left : 10px;

`

const TrackTitle = styled.h4`
  margin-top: 0px;
  margin-bottom : 0px;
  font-size : 15px;
`
const ArtistTitle = styled.h5`
  margin-top: 0px;
  margin-bottom : 0px;
  font-size : 12px;
  color : ${colors.textColorAlternate}
`


export default function SpotifySuggestion(props){

  return (
    <TrackInfo>
      <TrackTitle> {props.spotifySuggestedTrack.track} </TrackTitle>
      <ArtistTitle> {props.spotifySuggestedTrack.artist} </ArtistTitle>

    </TrackInfo>
  )
}
