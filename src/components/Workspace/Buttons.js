import styled from 'styled-components'
import { columnWidths } from '../../config'
import {colors, widths} from '../../Theme'

const ColumnTitlesContainer = styled.div`
  display : flex;
  margin-top : 20px;
  flex-direction : row;
  height : 60px;
  align-items : center;
  justify-content : center;
  width : ${widths.minWorkspaceWidth}px;
  min-width : ${widths.minWorkspaceWidth}px;
`
const Button = styled.button`
  width : ${props => props.width}px;
  margin-left : ${props=>props.lateralMargin}px;
  margin-right :  ${props=>props.lateralMargin}px;
  height : 50px;
  background : none;
  font-family : inherit;
  outline : none;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  border: 2px solid ${colors.dataRowColor};
  &:hover{
    cursor : pointer;
    background : ${colors.dataRowColor};
  }
  &:active{
    border: 2px solid ${colors.accentColor1}
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
      <Button lateralMargin={20}width={columnWidths["Keyword"] - 40}onClick={props.handleClear}>
        <label>Clear</label>
      </Button>
      <SelectButtonContainer>
        <Button width={(columnWidths["Source"] - 100)} lateralMargin={2} onClick={props.handleSelectAll}>
          <label>Select All</label>
        </Button>
        <Button width={(columnWidths["Source"] - 100)} lateralMargin={2} onClick={props.handleDeselectAll}>
          <label>De-Select All</label>
        </Button>
      </SelectButtonContainer>
      <Button lateralMargin={20}width={columnWidths["Master Track"] + 40} onClick={() => props.handleBatchDownload("masterLink")}>
        <label>Download Selected Masters (mp3)</label>
      </Button>
      <Button lateralMargin={20}width={columnWidths["Master Track"] + 40} onClick={() => props.handleBatchDownload("vocalsLink")}>
        <label>Download Selected Vocals (mp3)</label>
      </Button>
      <Button lateralMargin={20}width={columnWidths["Master Track"] + 40} onClick={() => props.handleBatchDownload("accompanimentLink")}>
        <label>Download Selected Accompaniments (mp3)</label>
      </Button>
      {
        //<Button lateralMargin={20}width={columnWidths["Master Track"] + 40} onClick={() => props.handleAddSongsToBeatPortCart()}>
        //   <label>Add Selected Songs to BeatPort Cart</label>
        // </Button>
      }
    </ColumnTitlesContainer>
  )
}
