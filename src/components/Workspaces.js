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
    "0" : {"name" : "Untitled", "component" : <Workspace/>},
    "1" : {"name" : "Untitled 1", "component" : <Workspace/>},
    "2" : {"name" : "Untitled 2", "component" : <Workspace/>}
  });

  const [workspace, setWorkspace] = useState("0")


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
