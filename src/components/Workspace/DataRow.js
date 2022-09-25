import styled from 'styled-components'
import { colors } from '../../Theme'
import React, { useState, useEffect } from 'react'
import SpotifySuggestion from './SpotifySuggestion'
import KeyAndBpm from './KeyAndBpm'

const Trash = styled.img`
  width : 30px;
  height : auto;
  margin-left : 20px;
  margin-right : 20px;
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

  return (
    <DataRowContainer background={props.selected? colors.dataRowColor : "none"}>
      <SpotifySuggestion track={props.track} artist={props.artist}/>
      <KeyAndBpm bpmAndKey={{key : props.musicalKey, mode : props.mode, bpm : props.bpm}}/>
    </DataRowContainer>
  )
}
