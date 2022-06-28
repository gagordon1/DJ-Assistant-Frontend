import styled from 'styled-components'
import { columnWidths } from '../../config'
import {colors} from '../../Theme'

const ColumnTitlesContainer = styled.div`
  display : flex;
  margin-top : 20px;
  flex-direction : row;
  height : 60px;
  width : 100%;
  align-items : center;
`
const Button = styled.button`
  width : 160px;
  margin-left : 40px;
  margin-right : 40px;
  height : 40px;
  background : ${colors.dataRowColor};
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover{
    cursor : pointer;
  }
`
const Button2 = styled.button`
  width : ${columnWidths["Master Track"] - 40}px;
  margin-left : 20px;
  margin-right : 20px;
  height : 40px;
  background : ${colors.dataRowColor};
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover{
    cursor : pointer;
  }
`

const TrackTitle = styled.div`
  width : ${columnWidths["Master Track"]}px;
`
export default function Buttons(props){

  return(

    <ColumnTitlesContainer>
      <Button>
        <label> Search All</label>
      </Button>
      <Button>
        <label> Search All</label>
      </Button>
      <Button2>
        <label>Download Selected</label>
      </Button2>
      <Button2>
        <label>Download Selected</label>
      </Button2>
      <Button2>
        <label>Download Selected</label>
      </Button2>
    </ColumnTitlesContainer>
  )
}
