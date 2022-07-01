import {useState} from 'react';
import WorkspaceNavbar from './WorkspaceNavbar'
import Workspace from './Workspace/Workspace'
import styled from 'styled-components'

const WorkspacesContainer = styled.div`
  display : flex;
  height : 100vh;
  width : 100vw;
  justify-content : center;
  align-items : center;
  flex-direction : column;

`

export default function Workspaces(props){

  const [audio, ] = useState(new Audio(""))
  return (
    <WorkspacesContainer>
      <Workspace accessToken={props.accessToken} audio={audio}/>
    </WorkspacesContainer>
  )
}
