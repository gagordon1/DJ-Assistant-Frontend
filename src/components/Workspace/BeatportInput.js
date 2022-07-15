import { useState } from 'react';
import styled from 'styled-components'
import { SearchBar } from '../SearchBar'
import Popup from 'reactjs-popup'
import {colors} from '../../Theme'

const Dialogue = styled.div`
  position: absolute;
  grid-gap : 15px;
  display : grid;
  grid-template-columns: repeat(1, 1fr);
  margin : auto;
  transform: translate(-50%, -50%);
  width : 300px;
  background : ${colors.grayOpaque};
  color : white;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.25);
`

const Title = styled.h3`
  justify-self : center;
  margin-bottom : 0px;
`
const SubmitButton = styled.button`
  margin-left : auto;
  margin-right : auto;
  width : auto;
  &:hover{
    cursor : pointer;
  }
`

export default function BeatportInput (props){

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = () =>{
    props.handleAddSongsToBeatPortCart(username, password);
    props.setOpen(false);
  }

  return(
    <div>
      <Popup open={props.open} onClose={() => props.setOpen(false)}>
        <Dialogue>
          <Title>Enter Beatport Login</Title>
          <SearchBar type="text" placeholder="Username..."
                onChange={e => setUsername(e.target.value)}/>
          <SearchBar type="password" placeholder="Password..."
                onChange={e => setPassword(e.target.value)}/>
          <SubmitButton onClick={handleSubmit}>
            Add Songs to Beatport Cart
          </SubmitButton>
        </Dialogue>
      </Popup>
    </div>
  )
}
