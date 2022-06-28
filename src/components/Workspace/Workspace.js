import styled from 'styled-components'
import { colors } from '../../Theme'
import { useState, useEffect } from 'react'
import DataRow from './DataRow'
import ColumnTitles from './ColumnTitles'
import AddButtonImage from '../../assets/add-button-grey.svg'
import { columnWidths } from '../../config'
import TrashIcon from '../../assets/trash-icon.svg'
import BatchImportInputOptions from './BatchImportInputOptions'
import Buttons from './Buttons'


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
  margin-bottom : 10px;
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
  max-height : 420px;
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
const HorizontalSeparatorBottom = styled.div`
  position : relative;
  width: inherit;
  height: 0px;
  border: 0.1px solid ${colors.trimLineColor};
`
const Checkbox = styled.input`
  margin-left : 10px;
  margin-right : 10px;
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

  const getActiveRows = () => data.filter(obj => obj !== undefined)

  const handleDeleteRow = (index) =>{
    let elt = getActiveRows()[index]
    let copy = [...data]
    let i = copy.indexOf(elt)
    delete data[i]
    let newDeleted = [...deleted]
    newDeleted.push(i)
    setDeleted(newDeleted)
  }

  const batchSearch = (searches) =>{
    let newData = [...data]
    searches.forEach(search =>
      newData.push(<DataRow
                        key={data.length}
                        search={search}
                        columns={columns}
                        audio={props.audio}/>
                      )
    )
    setData(newData)
  }

  const handleSelect = (e, i) =>{
    console.log(e.target.checked)
    console.log(i)
  }



  const handleAddDataRow = (search) =>{
    setData([...data, <DataRow
                          key={data.length}
                          search={search}
                          columns={columns}
                          audio={props.audio}/>])
    setTopId(topId + 1)
  }

  const handleBatchSearch = () =>{

  }
  const handleBatchMasterDownload = () =>{

  }
  const handleBatchVocalDownload = () =>{

  }
  const handleBatchAccompanimentDownload = () =>{

  }
  return (
    <WorkspaceContainer>
      <ColumnTitles columns={columns}/>
      <DataRowsContainer>
        {getActiveRows().map((obj, i) =>
          <RowContainer key={i} >
            <Checkbox onChange={(e) => handleSelect(e, i)} type={"checkbox"}></Checkbox>
            {obj}
            {(i === getActiveRows().length -1)?
              <Trash src={TrashIcon} onClick={() => handleDeleteRow(i)}/>
              : null}
          </RowContainer>)}
        <AddButton src={AddButtonImage} onClick={() => handleAddDataRow("")}/>
      </DataRowsContainer>
      <HorizontalSeparatorBottom/>
      <Buttons
        handleBatchSearch={handleBatchSearch}
        handleBatchMasterDownload={handleBatchMasterDownload}
        handleBatchVocalDownload={handleBatchVocalDownload}
        handleBatchAccompanimentDownload={handleBatchAccompanimentDownload}
        />
      <BatchImportInputOptions batchSearch={batchSearch}/>



      <HorizontalSeparator/>


    </WorkspaceContainer>
  )
}
