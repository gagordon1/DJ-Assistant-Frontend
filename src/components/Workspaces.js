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

  const [workspace, setWorkspace] = useState("0")

  //maps workspaces to their names
  const [workspaces, setWorkspaces] = useState({
    "0" : {"name" : "Untitled", "component" : <Workspace id={0} accessToken={props.accessToken} audio={audio}/>}
  });

  return (
    <WorkspacesContainer>
      <WorkspaceNavbar
        workspaces={workspaces}
        workspace={workspace}
        setWorkspace={setWorkspace}
        setWorkspaces={setWorkspaces}
      />
      {workspaces[workspace]["component"]}
    </WorkspacesContainer>
  )
}
