import styled from 'styled-components'
import { colors } from '../../Theme'
import { useState, useEffect } from 'react'
import DataRow from './DataRow'
import ColumnTitles from './ColumnTitles'
import AddButtonImage from '../../assets/add-button-grey.svg'
import { columnWidths } from '../../config'
import BatchImportInputOptions from './BatchImportInputOptions'
import Buttons from './Buttons'
import { youtubeSearch } from '../../controllers/youtube-controller'
import { CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ProgressBarContainer = styled.div`
  position: absolute;
  width : 200px;
  height : 200px;
  &:hover{
    cursor : pointer;
  }
`


//Data rows structure
// [
//        searchResults : []
//        sourceLink : String
//        vocalLink : String
//        masterLink : String
//        accompanimentLink : String
//        keyword : String
//  ]
//
const LoaderBackground = styled.div`
  display : flex;
  position : absolute;
  width : inherit;
  height : inherit;
  background : ${colors.whiteOpaque};
  justify-content : center;
  align-items : center;
`

const Loader = styled.div`
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
  margin-left : 137.5px;
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
const generateVerticalSeparators = (columns) =>{
  return columns.map((column, i) => <SeparatorLine
      marginLeft={columns.slice(0,i+1).reduce((a,b) => {return a + columnWidths[b]}, 0)}/>
    )
}

export default function Workspace(props){

  const [topId, setTopId] = useState(0)
  const [columns] = useState(["Keyword", "Source", "Master Track", "Vocals", "Accompaniment"])
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const [loadProgress, setLoadProgress] = useState(0)

  const defaultRow = (id) => {return {
      index : id,
      searchResults : [],
       sourceId : "",
       vocalsLink : "",
       masterLink : "",
       accompanimentLink : "",
       keyword : "",
       selected : false
     }
  }

  const handleAddDataRow = () =>{

    setData({...data, [topId] : defaultRow(topId)})
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

  const batchSearch = async (searches) =>{
    let id = topId
    let newData = {...data}
    setLoading(true)
    for (const search of searches){
        let row = defaultRow(id)
        row.keyword = search
        row.searchResults = await youtubeSearch(search)
        row.sourceId = row.searchResults[0].id
        newData[id] = row
        id++
        setLoadProgress(100*(id-topId)/searches.length)
    }
    setTopId(id)
    setData(newData)
    setLoading(false)
    setLoadProgress(0)
  }

  const handleSelectAll = () =>{
    let newData= {...data}
    Object.keys(newData).forEach(key =>{
      newData[key].selected = true
    })
    setData(newData)
  }

  const handleSearchSelected = async () =>{
    let newData = {...data}
    setLoading(true)
    let processed = 0
    let selected = Object.keys(newData).filter(key => newData[key].selected && newData[key].keyword)
    for (const key of selected){
      let searchResults = await youtubeSearch(newData[key].keyword)
      let sourceId = searchResults[0].id
      newData[key].searchResults = searchResults
      newData[key].sourceId = sourceId
      processed++
      setLoadProgress(100*(processed)/selected.length)
    }
    setData(newData)
    setLoading(false)
    setLoadProgress(0)


  }
  const handleBatchMasterDownload = () =>{

  }
  const handleBatchVocalDownload = () =>{

  }
  const handleBatchAccompanimentDownload = () =>{

  }
  const loadingScreen = () => (
    <LoaderBackground>
      <ProgressBarContainer>
        <CircularProgressbar value={loadProgress}/>
      </ProgressBarContainer>
    </LoaderBackground>
  )
  return (
    <WorkspaceContainer>
      {loading?  loadingScreen(): null}
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
            selected={data[key].selected}
            handleDeleteRow={handleDeleteRow}
            handleSet={handleSet}
            audio={props.audio}
          />)}
        <AddButton src={AddButtonImage} onClick={handleAddDataRow}/>
      </DataRowsContainer>
      <HorizontalSeparatorBottom/>
      <Buttons
        handleSelectAll={handleSelectAll}
        handleSearchSelected={handleSearchSelected}
        handleBatchMasterDownload={handleBatchMasterDownload}
        handleBatchVocalDownload={handleBatchVocalDownload}
        handleBatchAccompanimentDownload={handleBatchAccompanimentDownload}
        />
      <BatchImportInputOptions batchSearch={batchSearch}/>



      <HorizontalSeparator/>


    </WorkspaceContainer>
  )
}
