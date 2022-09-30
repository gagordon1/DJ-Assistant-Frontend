import styled from 'styled-components'
import { colors } from '../../Theme'

const TrackInfo = styled.div`
  display : flex;
  width : 800px;
  flex-direction : row;
  margin-top: auto;
  margin-bottom : auto;
  justify-content : center;
  padding-left : 10px;

`

const TrackTitle = styled.h4`
  font-size : 15px;
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  width : 400px;
  text-align : left;
  margin : auto;
`


export default function SpotifySuggestion(props){

  return (
    <TrackInfo>
      <TrackTitle> {props.track} </TrackTitle>
      <TrackTitle> {props.artist} </TrackTitle>

    </TrackInfo>
  )
}
