import {useState, useEffect} from 'react';
import Workspace from './Workspace/Workspace'
import styled from 'styled-components'
import { colors } from '../Theme'

const WorkspacesContainer = styled.div`
  display : flex;
  height : 100vh;
  width : 1441px;
  justify-content : center;
  align-items : top;
  flex-direction : row;
`

const VerticalSeparator = styled.div`
  height : 100%;
  overflow :hidden;
  position: relative;
  width: 0px;
  border: 0.1px solid ${colors.trimLineColor};
`


export default function Workspaces(props){
  useEffect(()=>{

  },[props.accessToken])
  return (
    <WorkspacesContainer>
      <VerticalSeparator/>
      <Workspace 
        accessToken={props.accessToken}/>
      <VerticalSeparator/>
    </WorkspacesContainer>
  )
}
