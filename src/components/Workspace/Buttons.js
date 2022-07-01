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
  margin-left : 30px;
`
const Button = styled.button`
  width : ${columnWidths["Keyword"] - 40}px;
  margin-left : 20px;
  margin-right : 20px;
  height : 40px;
  background : ${colors.dataRowColor};
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover{
    cursor : pointer;
  }
`
const Button3 = styled.button`
  width : ${(columnWidths["Source"] - 40)/2}px;
  margin : auto;
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

const SelectButtonContainer = styled.div`
  display : flex;
  justify-content : space-between;
  margin-left : 20px;
  margin-right : 20px;
  align-items : center;
`
export default function Buttons(props){

  return(

    <ColumnTitlesContainer>
      <Button onClick={props.handleSearchSelected}>
        <label>Search Selected</label>
      </Button>
      <SelectButtonContainer>
        <Button3 onClick={props.handleSelectAll}>
          <label>Select All</label>
        </Button3>
        <Button3 onClick={props.handleDeselectAll}>
          <label>De-Select All</label>
        </Button3>
      </SelectButtonContainer>
      <Button2 onClick={() => props.handleBatchDownload("masterLink")}>
        <label>Download Selected</label>
      </Button2>
      <Button2 onClick={() => props.handleBatchDownload("vocalsLink")}>
        <label>Download Selected</label>
      </Button2>
      <Button2 onClick={() => props.handleBatchDownload("accompanimentLink")}>
        <label>Download Selected</label>
      </Button2>
    </ColumnTitlesContainer>
  )
}
