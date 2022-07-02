import {useState, useEffect} from 'react';
import WorkspaceNavbar from './WorkspaceNavbar'
import Workspace from './Workspace/Workspace'
import styled from 'styled-components'
import { colors } from '../Theme'

const WorkspacesContainer = styled.div`
  display : flex;
  height : 100vh;
  width : 100vw;
  justify-content : center;
  align-items : center;
  flex-direction : column;

`

const BackgroundBlur = styled.div`
  position : absolute;
  width : 90%;
  height : 700px;
  background : ${colors.white};
  filter: blur(10px);
`

export default function Workspaces(props){

  const [audio, ] = useState(new Audio(""))

  useEffect(()=>{

  },[props.accessToken])
  return (
    <WorkspacesContainer>
      <BackgroundBlur/>
      <Workspace accessToken={props.accessToken} audio={audio}/>


    </WorkspacesContainer>
  )
}
