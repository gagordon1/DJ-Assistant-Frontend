import styled from 'styled-components'
import { columnWidths } from '../../config'


const ColumnTitlesContainer = styled.div`

  display : flex;
  margin-top : 30px;
  flex-direction : row;
  height : 60px;
  width : 100%;
  align-items : center;
`
const SourceTitle = styled.div`
  width : 240px;
`
const KeywordTitle = styled.div`
  width : 240px;
`

const TrackTitle = styled.div`
  width : ${columnWidths["Master Track"]}px;
`
export default function ColumnTitles(props){

  return(

    <ColumnTitlesContainer>
      <KeywordTitle>
        <h3>Keyword</h3>
      </KeywordTitle>
      <SourceTitle>
        <h3>Source</h3>
      </SourceTitle>
      <TrackTitle>
        <h3>Master Track</h3>
      </TrackTitle>
      <TrackTitle>
        <h3>Vocals</h3>
      </TrackTitle>
      <TrackTitle>
        <h3>Accompaniment</h3>
      </TrackTitle>
    </ColumnTitlesContainer>
  )
}
