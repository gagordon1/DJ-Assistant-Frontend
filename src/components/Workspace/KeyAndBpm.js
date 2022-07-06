import styled from 'styled-components'

const KeyAndBpmInfo = styled.div`
  display : flex;
  width : 120px;
  margin-left : 10px;
  flex-direction : row;
  justify-content : center;

`

const Item =styled.a`
  margin : auto;
`

const PITCH_CLASS = {
  0 : "C",
  1 : "C#",
  2 : "D",
  3 : "D#",
  4 : "E",
  5 : "F",
  6 : "F#",
  7 : "G",
  8 : "G#",
  9 : "A",
  10 : "A#",
  11 : "B"
}

export default function KeyAndBpm(props){

  return (
    <KeyAndBpmInfo>
      <Item>{PITCH_CLASS[props.bpmAndKey.key]}</Item>
      <Item>{props.bpmAndKey.bpm}</Item>
    </KeyAndBpmInfo>
  )
}
