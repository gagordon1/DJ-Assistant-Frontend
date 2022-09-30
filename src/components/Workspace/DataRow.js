import styled from 'styled-components'
import { colors } from '../../Theme'
import React, { useState, useEffect } from 'react'
import SpotifySuggestion from './SpotifySuggestion'
import KeyAndBpm from './KeyAndBpm'

const DataRowContainer = styled.div`
  display : flex;
  margin-left : 20px;
  align-items : center;
  margin-bottom : 5px;
  background : ${props => props.background};
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
