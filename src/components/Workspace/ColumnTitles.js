import styled from 'styled-components'
import { columnWidths } from '../../config'


const ColumnTitlesContainer = styled.div`

  display : flex;
  margin-top : 30px;
  flex-direction : row;
  height : 60px;
  width : 100%;
  align-items : center;
  margin-left : 30px
`
const SourceTitle = styled.div`
  width : ${columnWidths["Source"]}px;
`
const KeywordTitle = styled.div`
  width : ${columnWidths["Keyword"]}px;
`
const KeyBpmTitle = styled.div`
  width : ${columnWidths["KeyAndBpm"]}px;
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
      <TrackTitle>
        <h3>Spotify Suggestion</h3>
      </TrackTitle>
      <KeyBpmTitle>
        <h3>Key</h3>
      </KeyBpmTitle>
      <KeyBpmTitle>
        <h3>BPM</h3>
      </KeyBpmTitle>
    </ColumnTitlesContainer>
  )
}
