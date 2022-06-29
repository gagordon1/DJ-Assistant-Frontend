import styled from 'styled-components'
import { colors } from '../../Theme'
import React, { useState, useEffect } from 'react'
import { getDownloadLink, getVocalsLink, getAccompanimentLink } from '../../controllers/backend-controller'

import KeywordSearch from './KeywordSearch'
import Source from './Source'
import Track from './Track'
import TrashIcon from '../../assets/trash-icon.svg'


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
`

const Checkbox = styled.input`
  margin-right : 20px;
`

function DataRow(props){

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
      <Track index={props.index} link={props.masterLink} attribute={"masterLink"} handleSet={props.handleSet}
        getDownloadLink={getDownloadLink}id={props.sourceId} thumbnail={thumbnail} audio={props.audio}/>
      <Track index={props.index} link={props.vocalsLink} attribute={"vocalsLink"} handleSet={props.handleSet}
        getDownloadLink={getVocalsLink} id={props.sourceId} thumbnail={thumbnail} audio={props.audio}/>
      <Track index={props.index} link={props.accompanimentLink} attribute={"accompanimentLink"} handleSet={props.handleSet}
        getDownloadLink={getAccompanimentLink} id={props.sourceId} thumbnail={thumbnail} audio={props.audio}/>
      <Trash src={TrashIcon} onClick={() => props.handleDeleteRow(props.index)}/>
    </DataRowContainer>
  )
}

export default React.memo(DataRow)
