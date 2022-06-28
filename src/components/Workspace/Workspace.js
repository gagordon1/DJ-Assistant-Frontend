import styled from 'styled-components'
import { colors } from '../../Theme'
import { useState, useEffect } from 'react'
import DataRow from './DataRow'
import ColumnTitles from './ColumnTitles'
import AddButtonImage from '../../assets/add-button-grey.svg'
import { columnWidths } from '../../config'
import TrashIcon from '../../assets/trash-icon.svg'


const Trash = styled.img`
  width : 30px;
  height : auto;
  margin-left : 20px;
  &:hover{
    cursor : pointer;
  }
`
const RowContainer = styled.div`
  display : flex;
  flex-direction : row;
  align-items : center;
`

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
const DataRowsContainer = styled.div`
  display : flex;
  flex-direction : column;
  height : 400px;
  overflow-y : scroll;
  scrollbar-color: dark;

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

  const [topId, setTopId] = useState(0)
  const [columns] = useState(["Keyword", "Source", "Master Track", "Vocals", "Accompaniment"])
  const [deleted, setDeleted] = useState([]) //list of deleted indexes

  const [data, setData] = useState([])

  const handleDeleteRow = (index) =>{
    let elt = data.filter(obj => obj !== undefined)[index]
    let copy = [...data]
    let i = copy.indexOf(elt)
    delete data[i]
    let newDeleted = [...deleted]
    newDeleted.push(i)
    setDeleted(newDeleted)
  }

  const handleAddDataRow = () =>{
    setData([...data, <DataRow
                          key={data.length}
                          columns={columns}
                          audio={props.audio}/>])
    setTopId(topId + 1)
  }

  useEffect(()=>{

  }, [deleted])

  return (
    <WorkspaceContainer>
      <ColumnTitles columns={columns}/>
      <DataRowsContainer>
        {data.filter(obj => obj !== undefined).map((obj, i) =>
          <RowContainer key={i} >
            {obj}

            {(i === data.filter(obj => obj !== undefined).length -1)?
              <Trash src={TrashIcon} onClick={() => handleDeleteRow(i)}/>
              : null}
          </RowContainer>)}
        <AddButton src={AddButtonImage} onClick={handleAddDataRow}/>
      </DataRowsContainer>


      <HorizontalSeparator/>
    </WorkspaceContainer>
  )
}
