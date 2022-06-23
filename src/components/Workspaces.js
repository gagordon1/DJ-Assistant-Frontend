import {useState, useEffect} from 'react';
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

export default function Workspaces(){

  //maps workspaces to their names
  const [workspaces, setWorkspaces] = useState({
    "0" : "Untitled",
    "1": "Untitled 1",
    "2" : "Untitled 2"
  });

  const [workspace, setWorkspace] = useState("0")

  const [workspaceComponents, setWorkspaceComponents] = useState([
    <Workspace/>,
    <Workspace/>,
    <Workspace/>
  ])

  return (
    <WorkspacesContainer>
      <WorkspaceNavbar
        workspaces={workspaces}
        workspace={workspace}
        setWorkspace={setWorkspace}
      />
      {workspaceComponents[workspace]}
    </WorkspacesContainer>
  )
}
