import styled from 'styled-components'
import { colors } from '../../Theme'


const KeywordSearchContainer = styled.div`
  display : flex;
  align-items : center;
  justify-content : space-between;
  width : 200px;
  height : 80%;
  background : ${colors.dataRowColor};
  margin-left : 20px;
  margin-right : 20px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
`

const SearchBar = styled.input`
  background : inherit;
  border : none;
  outline : none;
  color : ${colors.textColor};
  overflow : scroll;
  margin-left : 10px;
  align-items : center;
`

const SearchButton = styled.div`
  background : ${colors.background};
  transform : rotate(-90deg) translate(0, 11px);
  width : 48px;
  height : 25px;
  margin-bottom : 0px;
  justify-self : end;
  font-size : 12px;
  vertical-align : middle;
  &:hover {
    cursor : pointer;
  }
`
const SearchButtonText = styled.h3`
  margin : auto;
`


const placeholder = "Keyword..."

export default function KeywordSearch(props){

  return (
    <KeywordSearchContainer>

      <SearchBar placeholder={placeholder}
                onChange={(e) => props.setKeyword(e.target.value)}/>
      <SearchButton onClick={props.handleSearch}>
        <SearchButtonText>Search</SearchButtonText>
      </SearchButton>

    </KeywordSearchContainer>
  )
}
