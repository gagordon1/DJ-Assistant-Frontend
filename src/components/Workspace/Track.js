import styled from 'styled-components'
import { colors } from '../../Theme'


const TrackContainer = styled.div`
  width : 500px;
  height : 80%;
  background : ${colors.dataRowColor};
  margin-left : 20px;
  margin-right : 20px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
`

export default function Track(){

  return (
    <TrackContainer>
    </TrackContainer>
  )
}
