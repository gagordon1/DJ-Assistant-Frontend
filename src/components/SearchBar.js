import styled from 'styled-components'
import { colors } from '../Theme'

export const SearchBar = styled.input`
  background : none;
  border : none;
  outline : none;
  color : ${colors.textColor};
  overflow : scroll;
  margin-left : 10px;
  align-items : center;
  font-size : 16px;
  font-family : inherit;
`
