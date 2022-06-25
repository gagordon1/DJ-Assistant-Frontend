import styled from 'styled-components'
import { colors } from '../../Theme'
import { useState, useEffect} from 'react'
import DataRow from './DataRow'
import ColumnTitles from './ColumnTitles'
import AddButtonImage from '../../assets/add-button-grey.svg'

const columnWidths = {
  "Keyword" : 240,
  "Source" : 240,
  "Master Track" : 168,
}

const AddButton = styled.img`
  width : 25px;
  height : auto;
  margin-top : 10px;
  margin-left : 107.5px;
  &: hover{
    cursor : pointer;
  }
`

const WorkspaceContainer = styled.div`
  display : flex;
  flex-direction : column;
  width : 90%;
  height : 700px;
  background : ${colors.workspaceBackground};
`

const SeparatorLine = styled.div`
  position : absolute;
  margin-top: 90px;
  width: 0px;
  height: 610px;
  margin-left : ${props => props.marginLeft}px;
  border: 0.1px solid ${colors.trimLineColor};
`
const HorizontalSeparator = styled.div`
  margin-top : 90px;
  position: absolute;
  width: inherit;
  height: 0px;
  border: 0.1px solid ${colors.trimLineColor};
`
const generateVerticalSeparators = (columns) =>{
  return columns.map((column, i) => <SeparatorLine
      marginLeft={columns.slice(0,i+1).reduce((a,b) => {return a + columnWidths[b]}, 0)}/>
    )
}

export default function Workspace(props){

  const [columns, setColumns] = useState(["Keyword", "Source", "Master Track"])

  const [data, setData] = useState([<DataRow columns={columns} audio={props.audio}/>])



  const handleAddDataRow = () =>{
    setData([...data, <DataRow columns={columns} audio={props.audio}/>])
  }

  return (
    <WorkspaceContainer>
      <ColumnTitles columns={columns}/>
      {data}
      <AddButton src={AddButtonImage} onClick={handleAddDataRow}/>

      <HorizontalSeparator/>
      {generateVerticalSeparators(columns)}
    </WorkspaceContainer>
  )
}
