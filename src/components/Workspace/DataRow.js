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
  height : 60px;
  width : 100%;
  background : ${colors.workspaceBackground};
`



export default function DataRow(props){

  const [keyword, setKeyword] = useState("")
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = async () => {
    setLoading(true)
    const data = await youtubeSearch("hi")

  }


  return (
    <DataRowContainer>
      <KeywordSearch setKeyword={setKeyword} handleSearch={handleSearch}/>
      <Source keyword={keyword}/>
      <Track/>
    </DataRowContainer>
  )
}
