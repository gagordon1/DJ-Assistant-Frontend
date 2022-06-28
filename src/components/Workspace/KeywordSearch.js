import styled from 'styled-components'
import { colors } from '../../Theme'
import React, {useEffect} from 'react'
import { youtubeSearch } from '../../controllers/youtube-controller'


const KeywordSearchContainer = styled.div`
  display : flex;
  align-items : center;
  justify-content : space-between;
  width : 200px;
  height : 80%;
  background : ${colors.dataRowColor};
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
  font-size : 16px;
  font-family : inherit;
`




const placeholder = "Keyword..."

export default function KeywordSearch(props){

  const searchInput = React.useRef(null)

  const handleKeyDown = async (e) =>{
    if (e.key === "Enter"){
      if (document.activeElement === searchInput.current) {
        const results = await youtubeSearch(props.keyword)
        props.handleSet(props.index, "searchResults", results)
      }
    }
  }
  return (
    <KeywordSearchContainer>

      <SearchBar placeholder={placeholder}
                onChange={(e) => props.handleSet(props.index, "keyword", e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
                ref={searchInput}
                defaultValue={props.keyword}
                />

    </KeywordSearchContainer>
  )
}
