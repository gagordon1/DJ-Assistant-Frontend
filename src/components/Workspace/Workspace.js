import styled from 'styled-components'
import { colors } from '../../Theme'
import { useState, useEffect } from 'react'
import DataRow from './DataRow'
import ColumnTitles from './ColumnTitles'
import AddButtonImage from '../../assets/add-button-grey.svg'
import { columnWidths } from '../../config'
import BatchImportInputOptions from './BatchImportInputOptions'
import Buttons from './Buttons'

//Data rows structure
// [
//        searchResults : []
//        sourceLink : String
//        vocalLink : String
//        masterLink : String
//        accompanimentLink : String
//        keyword : String
//  ]


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

  const [data, setData] = useState({})

  const handleAddDataRow = () =>{

    setData({...data, [topId] : {
      index : topId,
      searchResults : [],
       sourceId : "",
       vocalsLink : "",
       masterLink : "",
       accompanimentLink : "",
       keyword : ""
    }})
    setTopId(topId + 1)
  }

  const handleDeleteRow = (index) =>{
    const newData = {...data}
    delete newData[index]
    setData(newData)
  }

  const handleSet = (index, attribute, value) => {
    console.log(attribute, value)
    setData({...data, [index] : {
        ...data[index],
        [attribute] : value
      }
    })
  }

  const handleSelect = (e, i) =>{
    console.log(e.target.checked)
    console.log(i)
  }

  const batchSearch = () =>{

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
        {Object.keys(data).map(key =>
          <DataRow
            key={data[key].index}
            index={data[key].index}
            searchResults={data[key].searchResults}
            sourceId={data[key].sourceId}
            vocalsLink={data[key].vocalsLink}
            masterLink={data[key].masterLink}
            accompanimentLink={data[key].accompanimentLink}
            keyword={data[key].keyword}
            handleDeleteRow={handleDeleteRow}
            handleSet={handleSet}
            audio={props.audio}
          />)}
        <AddButton src={AddButtonImage} onClick={handleAddDataRow}/>
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
