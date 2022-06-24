import styled from 'styled-components'
import { colors } from '../../Theme'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { youtubeSearch } from '../../youtube-api-calls'

import KeywordSearch from './KeywordSearch'
import Source from './Source'
import Track from './Track'

const DataRowContainer = styled.div`
  display : flex;
  align-items : center;
  height : 80px;
  width : 100%;
  background : ${colors.workspaceBackground};
`



export default function DataRow(props){

  const [keyword, setKeyword] = useState("")
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [id, setId] = useState("") //id of youtube video

  const handleSearch = async () => {
    setLoading(true)
    if(keyword){
      const data = await youtubeSearch(keyword)
      setSearchResults(data)
      setId(data[0].id)
    }else{
      alert("Keyword cannot be empty")
    }
    setLoading(false)
  }


  return (
    <DataRowContainer>
      <KeywordSearch setKeyword={setKeyword} handleSearch={handleSearch}/>
      <Source keyword={keyword} setId={setId} searchResults={searchResults}/>
      <Track id={id}/>
    </DataRowContainer>
  )
}
