import styled from 'styled-components'
import { colors } from '../../Theme'
import { useState } from 'react'
import { youtubeSearch } from '../../youtube-api-calls'
import { getDownloadLink, getVocalsLink, getAccompanimentLink } from '../../backend-calls'
import DefaultImage from '../../assets/default_image.png'

import KeywordSearch from './KeywordSearch'
import Source from './Source'
import Track from './Track'

const DataRowContainer = styled.div`
  display : flex;
  align-items : center;
  height : 90px;
  width : 100%;
  background : ${colors.workspaceBackground};
`



export default function DataRow(props){

  const [keyword, setKeyword] = useState("")
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [id, setId] = useState("") //id of youtube video
  const [thumbnail, setThumbnail] = useState()
  const [stemsAccessed, setStemsAccessed] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    if(keyword){
      const data = await youtubeSearch(keyword)
      setSearchResults(data)
      setId(data[0].id)
      setThumbnail(data[0].thumbnail)
    }else{
      alert("Keyword cannot be empty")
    }
    setLoading(false)
  }
  return (
    <DataRowContainer>
      <KeywordSearch setKeyword={setKeyword} handleSearch={handleSearch}/>
      <Source keyword={keyword} setId={setId} setThumbnail={setThumbnail} searchResults={searchResults}/>
      <Track getDownloadLink={getDownloadLink} stemsAccessed={stemsAccessed}
          id={id} thumbnail={thumbnail} audio={props.audio}/>
      <Track  getDownloadLink={getVocalsLink} setStemsAccessed={setStemsAccessed}
          id={id} thumbnail={thumbnail} audio={props.audio}/>
      <Track getDownloadLink={getAccompanimentLink} setStemsAccessed={setStemsAccessed}
          id={id} thumbnail={thumbnail} audio={props.audio}/>
    </DataRowContainer>
  )
}
