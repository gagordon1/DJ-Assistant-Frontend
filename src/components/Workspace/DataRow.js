import styled from 'styled-components'
import { colors } from '../../Theme'
import React, { useState } from 'react'
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
  min-height : 90px;
  background : ${colors.workspaceBackground};
`

function DataRow(props){

  console.log("rendering")

  const [keyword, setKeyword] = useState(props.search)
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [id, setId] = useState("") //id of youtube video
  const [thumbnail, setThumbnail] = useState()

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
      <KeywordSearch search={props.search} setKeyword={setKeyword} handleSearch={handleSearch}/>
      <Source keyword={keyword} setId={setId} setThumbnail={setThumbnail} searchResults={searchResults}/>
      <Track getDownloadLink={getDownloadLink}id={id} thumbnail={thumbnail} audio={props.audio}/>
      <Track  getDownloadLink={getVocalsLink} id={id} thumbnail={thumbnail} audio={props.audio}/>
      <Track getDownloadLink={getAccompanimentLink} id={id} thumbnail={thumbnail} audio={props.audio}/>
    </DataRowContainer>
  )
}

export default React.memo(DataRow)
