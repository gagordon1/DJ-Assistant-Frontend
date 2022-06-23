import styled from 'styled-components'
import WorkspaceNavbarTab from './WorkspaceNavbarTab'
import {colors} from '../Theme'

const NavbarContainer = styled.div`
  width : 90%;
  display : flex;
  flex-direction : row;
`

export default function WorkspaceNavbar(props){


  return (
    <NavbarContainer>
      {Object.keys(props.workspaces).map(key => <WorkspaceNavbarTab key={key}
        title={props.workspaces[key]}
        color={props.workspace === key? colors.workspaceBackground : colors.background}
        workspace={key}
        setWorkspace={props.setWorkspace}
        />)
      }
    </NavbarContainer>
  )
}
