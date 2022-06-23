import styled from 'styled-components'
import { colors } from '../../Theme'

const WorkspaceContainer = styled.div`
  width : 90%;
  height : 700px;
  background : ${colors.workspaceBackground};
`

export default function Workspace(props){

  return (
    <WorkspaceContainer>

    </WorkspaceContainer>
  )
}
