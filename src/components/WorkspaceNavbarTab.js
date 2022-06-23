import styled from 'styled-components'
import { colors } from '../Theme'
import XButtonImage from '../assets/x-button.png'

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
const XButton = styled.img`
  position : relative;
  align-self : center;
  right : -52px;
  height : 10px;
  width : 10px;
  &:hover{

  }
`

export default function WorkspaceNavbarTab(props){


  const deleteWorkspace = async () =>{
    if (Object.keys(props.workspaces).length > 1){
      // let newWorkspaces = {...props.workspaces}
      // delete newWorkspaces[props.workspace]
      // props.setWorkspaces(newWorkspaces)
      console.log("DELETE")
    }
    else{
      alert("Must have at least one workspace")
    }

  }


  return (
    <TabContainer color={props.color} onClick={() => props.setWorkspace(props.workspace)}>
      <Title>{props.title} </Title>
      <XButton src={XButtonImage} onClick={() => deleteWorkspace()}/>
      <Separator/>
    </TabContainer>
  )
}
