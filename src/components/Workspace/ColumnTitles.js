import styled from 'styled-components'
import { columnWidthArray } from '../../config'
import SelectorImage from '../../assets/selector.svg'
import { colors, widths } from '../../Theme'

const sortKeyMap = {
  "Keyword" :["keyword-desc", "keyword-asc"],
  "Source": [],
  "Master Track": [],
  "Vocals": [],
  "Accompaniment" : [],
  "Spotify Suggestion": ["spotifySuggestion-desc", "spotifySuggestion-asc"],
  "Key": ["key-desc", "key-asc"],
  "BPM": ["bpm-desc", "bpm-asc"],
}


const ColumnTitlesContainer = styled.div`
  display : flex;
  flex-direction : row;
  height : 50px;
  align-items : center;
  margin-left : 30px;
  min-width : ${widths.minWorkspaceWidth - 80}px;
`
const Title = styled.div`
  display : flex;
  flex-direction : row;
  justify-content : center;
  width : ${props => props.width}px;
  color : ${props => props.selected? colors.accentColor1 : colors.textColor};
  &:hover{
    color : ${colors.accentColor1};
    cursor : pointer;
  }
`
const Selector = styled.img`
  position : relative;
  margin-left : 5px;
  width : 10px;
  height : auto;
  transform : rotate(${props => props.rot}deg);
  display : ${props => props.display? "block" : "none"};
  &:hover{
    cursor : pointer;
  }
`
export default function ColumnTitles(props){

  const getRot = (name) =>{
    if(sortKeyMap[name].includes(props.sortKey)){
      return props.sortKey === sortKeyMap[name][0]? 0 : 180
    }
    return 0
  }

  const getDisplay = (name) =>{
    return (sortKeyMap[name].includes(props.sortKey))
  }

  const handleTitleClick = (name) =>{
    if (sortKeyMap[name].includes(props.sortKey)){
      props.setSortKey(sortKeyMap[name].find(a => props.sortKey!== a))
    }else{
      props.setSortKey(sortKeyMap[name][0])
    }
  }

  return(
    <ColumnTitlesContainer>
      {columnWidthArray.map((obj, i) => (
        <Title key={i} onClick={() => handleTitleClick(obj.name)}selected={getDisplay(obj.name)} width={obj.width}>
          <h3>{obj.name}</h3>
          <Selector display={getDisplay(obj.name)} src={SelectorImage} rot={getRot(obj.name)}/>
        </Title>
      ))}
    </ColumnTitlesContainer>
  )
}
