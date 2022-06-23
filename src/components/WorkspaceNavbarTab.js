import styled from 'styled-components'
import { colors } from '../Theme'

const TabContainer = styled.div`
  display : flex;
  justify-content : space-between;
  background : ${props => props.color};
  width: 200px;
  height: 33px;
  &:hover{
    cursor : pointer;
  }
`
const Title = styled.h4`
  margin-top : auto;
  margin-bottom : auto;
  margin-left : 10px;
`
const Separator = styled.div`
  margin-right : 0px;
  margin-top : auto;
  margin-bottom : auto;
  width: 0px;
  height: 60%;
  border: .5px solid ${colors.textColor};
`

export default function WorkspaceNavbarTab(props){
  return (
    <TabContainer color={props.color} onClick={() => props.setWorkspace(props.workspace)}>
      <Title>{props.title} </Title>
      <Separator/>
    </TabContainer>
  )
}
