import LogoImage from '../assets/logo192.png'
import BatchImportInputOptions from './BatchImportInputOptions'
import styled from 'styled-components'

const Logo = styled.img`
  width : 70px;
  height : auto;
  margin-left : auto;
  margin-right : auto;
`
const TopContainer = styled.div`
  display : grid;
  grid-template-columns : 1fr 1fr 1fr;
  align-items : center;
  margin-top : 10px;
  margin-bottom : 10px;
  width : 100%;
`

const Menu = styled.div`
  margin-right : 40px;
  display : flex;
  flex-direction : row;
  justify-content : right;
`

export default function Navbar(props){



  return(
    <TopContainer>
      <BatchImportInputOptions accessToken={props.accessToken} setData={props.setData}/>
      {props.loading?  props.loadingScreen(): null}
      <Logo src={LogoImage}/>
      <Menu>
        <h3 style={{"margin-right" : "40px"}}> Contact </h3>
        <h3 style={{"margin-right" : "10px"}}> Help </h3>
      </Menu>

    </TopContainer>
  )


}
