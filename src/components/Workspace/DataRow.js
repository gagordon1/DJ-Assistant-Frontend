import styled from 'styled-components'
import { colors } from '../../Theme'
import React, { useState, useEffect } from 'react'
import { getDownloadLink, getVocalsLink, getAccompanimentLink } from '../../controllers/backend-controller'

import KeywordSearch from './KeywordSearch'
import Source from './Source'
import Track from './Track'
import TrashIcon from '../../assets/trash-icon.svg'
import KeyAndBpm from './KeyAndBpm'
import SpotifySuggestion from './SpotifySuggestion'


const Trash = styled.img`
  width : 30px;
  height : auto;
  margin-left : 20px;
  &:hover{
    cursor : pointer;
  }
`


const DataRowContainer = styled.div`
  display : flex;
  margin-left : 20px;
  align-items : center;
  height : 90px;
  min-height : 90px;
  background : ${props => props.background};
  margin-bottom : 10px;
`

const Checkbox = styled.input`
  margin-right : 20px;
`

export default function DataRow(props){

  const [thumbnail, setThumbnail] = useState("")

  useEffect(()=>{
    if(props.sourceId){
      setThumbnail(props.searchResults.filter(obj=>obj.id ===props.sourceId)[0].thumbnail)
    }
  }, [props.sourceId, props.searchResults])

  return (
    <DataRowContainer background={props.selected? colors.dataRowColor : colors.workspaceBackground}>

      <Checkbox checked={props.selected} type="checkbox" onChange={(e) => props.handleSet(props.index, "selected", e.target.checked)}/>
      <KeywordSearch index={props.index} keyword={props.keyword} handleSet={props.handleSet} handleSearch={props.handleSearch}/>
      <Source index={props.index} keyword={props.keyword}
        handleSet={props.handleSet} searchResults={props.searchResults}/>
      <Track key={props.index + "master"}index={props.index} link={props.masterLink} attribute={"masterLink"} handleSet={props.handleSet}
        getDownloadLink={getDownloadLink}id={props.sourceId} thumbnail={thumbnail} audio={props.audio}/>
      <Track key={props.index + "vocals"} index={props.index} link={props.vocalsLink} attribute={"vocalsLink"} handleSet={props.handleSet}
        getDownloadLink={getVocalsLink} id={props.sourceId} thumbnail={thumbnail} audio={props.audio}/>
      <Track key={props.index + "accompaniment"} index={props.index} link={props.accompanimentLink} attribute={"accompanimentLink"} handleSet={props.handleSet}
        getDownloadLink={getAccompanimentLink} id={props.sourceId} thumbnail={thumbnail} audio={props.audio}/>
      {props.accessToken?<SpotifySuggestion spotifySuggestedTrack={props.spotifySuggestedTrack} index={props.index}
                    handleSet={props.handleSet} keyword={props.keyword} sourceId={props.sourceId}
                    accessToken={props.accessToken}/> : null}
      {props.accessToken?<KeyAndBpm accessToken={props.accessToken} bpmAndKey={props.bpmAndKey} handleSet={props.handleSet}
              index={props.index} spotifySuggestedTrack={props.spotifySuggestedTrack}/> : null}
      <Trash src={TrashIcon} onClick={() => props.handleDeleteRow(props.index)}/>
    </DataRowContainer>
  )
}
