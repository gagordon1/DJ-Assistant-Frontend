import styled from 'styled-components'
import { colors } from '../../Theme'
import { useState } from 'react'
import DataRow from './DataRow'
import ColumnTitles from './ColumnTitles'
import AddButtonImage from '../../assets/add-button-grey.svg'
import BatchImportInputOptions from './BatchImportInputOptions'
import Buttons from './Buttons'
import { youtubeSearch } from '../../controllers/youtube-controller'
import { getDownloadLink, getVocalsLink, getAccompanimentLink } from '../../controllers/backend-controller'
import { CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { YOUTUBE_VIDEO_BASE_URL } from '../../config'
import { saveAs } from 'file-saver';

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
    let newData = {...data}
    newData[index][attribute] = value
    if(attribute === "searchResults"){
      newData[index].sourceId = value[0].id
    }

    setData(newData)
  }

  const batchSearch = async (searches) =>{
    let id = topId
    let newObj = {}
    setLoading(true)
    for (const search of searches){
        let row = defaultRow(id)
        row.keyword = search
        row.searchResults = await youtubeSearch(search)
        row.sourceId = row.searchResults[0].id
        newObj[id] = row
        id++
        setLoadProgress(100*(id-topId)/searches.length)
    }
    let newData = {...data, ...newObj}
    console.log(newData)
    setTopId(id)
    setData(newData)
    setLoading(false)
    setLoadProgress(0)
  }

  const handleSelectAll = (selected) =>{
    let newData= {...data}
    Object.keys(newData).forEach(key =>{
      newData[key].selected = selected
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
    setData({...data, ...newData})
    setLoading(false)
    setLoadProgress(0)
  }

  function download(dataurl, filename) {
    const link = document.createElement("a");
    link.href = dataurl;
    link.click();
  }
  // function download(dataurl, filename) {
  //   window.URL = window.URL || window.webkitURL;
  //
  //   var xhr = new XMLHttpRequest(),
  //         a = document.createElement('a'), file;
  //
  //   xhr.open('GET', dataurl, true);
  //   xhr.responseType = 'blob';
  //   xhr.onload = function () {
  //       file = new Blob([xhr.response], { type : 'application/octet-stream' });
  //       a.href = window.URL.createObjectURL(file);
  //       a.download = 'someName.mp3';  // Set to whatever file name you want
  //       // Now just click the link you created
  //       // Note that you may have to append the a element to the body somewhere
  //       // for this to work in Firefox
  //       a.click();
  //   };
  //   xhr.send();
  // }

  const handleBatchDownload = async (type) =>{
    let newData = {...data}
    let selected = Object.keys(newData).filter(key => newData[key].selected)
    setLoading(true)
    let processed = 0
    let getLink = null
    switch(type){
      case "accompanimentLink":
        getLink = getAccompanimentLink
        break;
      case "vocalsLink":
        getLink = getVocalsLink
        break;
      default: //if masterLink
        getLink = getDownloadLink
        break;
    }

    for (const key of selected){
        if (newData[key][type]){
          download(newData[key][type] + "/download.mp3", newData[key].sourceId + ".mp3")
        }
        else{
            let link = await getLink(YOUTUBE_VIDEO_BASE_URL + newData[key].sourceId)
            newData[key][type] = link
            download(link + "/download.mp3", newData[key].sourceId + ".mp3")
        }
        processed++
        setLoadProgress(100*(processed)/selected.length)
    }
    setData(newData)
    setLoading(false)
    setLoadProgress(0)

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
        handleSelectAll={() => handleSelectAll(true)}
        handleDeselectAll={() => handleSelectAll(false)}
        handleSearchSelected={handleSearchSelected}
        handleBatchDownload={handleBatchDownload}
        />
      <BatchImportInputOptions batchSearch={batchSearch}/>
      {loading?  loadingScreen(): null}
      <HorizontalSeparator/>
    </WorkspaceContainer>
  )
}
