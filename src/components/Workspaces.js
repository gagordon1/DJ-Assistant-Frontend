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
  position: relative;
  width: 0px;
  border: 0.1px solid ${colors.trimLineColor};
`


export default function Workspaces(props){

  const [audio, ] = useState(new Audio(""))
  const [audioSource, setAudioSource] = useState("")

  useEffect(()=>{

  },[props.accessToken])
  return (
    <WorkspacesContainer>
      <VerticalSeparator/>
      <Workspace audioSource={audioSource} setAudioSource={setAudioSource}
        accessToken={props.accessToken} audio={audio}/>
      <VerticalSeparator/>
    </WorkspacesContainer>
  )
}
