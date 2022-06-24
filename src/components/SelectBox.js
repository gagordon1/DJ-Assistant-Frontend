import styled from 'styled-components'
import { colors } from '../Theme'

const SelectBoxStyled = styled.select`
  background : ${colors.dataRowColor};
  border : none;
`

export default function SelectBox(props){
  return (
    <SelectBoxStyled type="select"/>
  )
}
