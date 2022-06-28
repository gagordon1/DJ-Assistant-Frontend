import styled from 'styled-components'
import { colors } from '../../Theme'
import React, { useState, useEffect } from 'react'
import { youtubeSearch } from '../../controllers/youtube-controller'
import { getDownloadLink, getVocalsLink, getAccompanimentLink } from '../../controllers/backend-controller'
import DefaultImage from '../../assets/default_image.png'

import KeywordSearch from './KeywordSearch'
import Source from './Source'
import Track from './Track'


const DataRowContainer = styled.div`
  display : flex;
  margin-left : 20px;
  align-items : center;
  height : 90px;
  min-height : 90px;
  background : ${colors.workspaceBackground};
`

function DataRow(props){

  const [thumbnail, setThumbnail] = useState("")

  useEffect(()=>{
    if(props.sourceId){
      setThumbnail(props.searchResults.filter(obj=>obj.id ===props.sourceId)[0].thumbnail)
    }
  }, [props.sourceId])

  return (
    <DataRowContainer>
      <KeywordSearch index={props.index} keyword={props.keyword} handleSet={props.handleSet} handleSearch={props.handleSearch}/>
      <Source index={props.index} keyword={props.keyword}
        handleSet={props.handleSet} searchResults={props.searchResults}/>
      <Track index={props.index} link={props.masterLink} attribute={"masterLink"}
        getDownloadLink={props.getDownloadLink}id={props.sourceId} thumbnail={thumbnail} audio={props.audio}/>
      <Track index={props.index} link={props.vocalsLink} attribute={"vocalsLink"}
        getDownloadLink={props.getVocalsLink} id={props.sourceId} thumbnail={thumbnail} audio={props.audio}/>
      <Track index={props.index} link={props.accompanimentLink} attribute={"accompanimentLink"}
        getDownloadLink={props.getAccompanimentLink} id={props.sourceId} thumbnail={thumbnail} audio={props.audio}/>
    </DataRowContainer>
  )
}

export default React.memo(DataRow)
