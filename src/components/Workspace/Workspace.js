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
import { searchSpotifyTracks, getBulkAudioFeatures } from '../../controllers/spotify-controller'
import { addSongsToBeatPortCart } from '../../controllers/beatport-controller'
import { CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { YOUTUBE_VIDEO_BASE_URL } from '../../config'
import { widths } from '../../Theme'

const ProgressBarContainer = styled.div`
  position: absolute;
  width : 200px;
  height : 200px;
  transform : translate(0, -50px);
  &:hover{
    cursor : pointer;
  }
`

const LoaderBackground = styled.div`
  display : flex;
  position : absolute;
  left : 0;
  top : 0;
  width : 100vw;
  height : 100vh;
  background : ${colors.whiteOpaque};
  justify-content : center;
  align-items : center;
  overflow : hidden;
`

const AddButton = styled.img`
  width : 25px;
  height : auto;
  margin-top : 10px;
  margin-bottom : 20px;
  margin-left : 137.5px;
  &: hover{
    cursor : pointer;
  }
`

const WorkspaceContainer = styled.div`
  display : flex;
  flex-direction : column;
`
const DataRowsContainer = styled.div`
  display : flex;
  flex-direction : column;
  min-height : 420px;
  height : 420px;
  min-width : ${widths.minWorkspaceWidth}px;
  overflow-y : scroll;
  scrollbar-color: dark;
`
const HorizontalSeparator = styled.div`
  position: relative;
  min-width : ${widths.minWorkspaceWidth}px;
  width: 99%;
  height: 0px;
  border: 0.1px solid ${colors.trimLineColor};
`


export default function Workspace(props){

  const [topId, setTopId] = useState(0)
  const [columns] = useState(["Keyword", "Source", "Master Track", "Vocals", "Accompaniment"])
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const [loadProgress, setLoadProgress] = useState(0)
  const [sortKey, setSortKey] = useState("default")

  const defaultRow = (id) => {return {
      index : id,
      searchResults : [],
       sourceId : "",
       vocalsLink : "",
       masterLink : "",
       accompanimentLink : "",
       keyword : "",
       selected : false,
       bpmAndKey : {bpm : null, key : null, mode : null},
       spotifySuggestedTrack: {artist : "", track : "", spotifyId : ""}//spotify's best guess at the keyword search
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

  const getSuggestion = async(search) =>{
    try{
      let suggestion = await searchSpotifyTracks(props.accessToken, search)
      let spotifySuggestedTrack = {
        track : suggestion.name,
        artist : suggestion.artists.map(obj => obj.name).join(", "),
        spotifyId : suggestion.id
      }
      return spotifySuggestedTrack
    }
    catch(error){
      console.log(`Could not get spotify search data for search: ${search}`)
      return {artist : "", track : "", spotifyId : ""}
    }

  }

  const batchSearch = async (searches) =>{
    let id = topId
    let newObj = {}
    setLoading(true)
    const spotifyIds = []
    for (const search of searches){
        try{
          let row = defaultRow(id)
          row.keyword = search
          row.searchResults = await youtubeSearch(search)
          row.sourceId = row.searchResults[0].id
          if (props.accessToken){
            row.spotifySuggestedTrack = await getSuggestion(search)
            spotifyIds.push(row.spotifySuggestedTrack.spotifyId)
          }
          newObj[id] = row

        }catch(error){
          console.log(`Could not search for track ${search}`)
        }
        id++
        setLoadProgress(100*(id-topId)/searches.length)

    }
    //batch search for bpm and key now
    if(props.accessToken){
      try{
        let features = await getBulkAudioFeatures(props.accessToken, spotifyIds)
        features.forEach(obj =>{
          try{
            let row = newObj[Object.keys(newObj).find(key => newObj[key].spotifySuggestedTrack.spotifyId === obj.id)]
            row.bpmAndKey = {bpm : obj.tempo, key : obj.key, mode : obj.mode}
          }catch(error){
            console.log(error)
          }

          }
        )
      }catch(error){
        alert("Could not get key and bpm. Try logging into Spotify again.")
      }
    }
    let newData = {...data, ...newObj}
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

  const handleClear = () => {
    setData({})
  }

  function download(dataurl, filename) {
    const link = document.createElement("a");
    link.href = dataurl;
    link.click();
  }
  const handleAddSongsToBeatPortCart = async () =>{
    setLoading(true)
    let selectedSearches = Object.keys(data).filter(key => data[key].selected)
      .map(key => data[key].spotifySuggestedTrack.track + " " + data[key].spotifySuggestedTrack.artist)
    if (selectedSearches.length > 0){
      try{
        await addSongsToBeatPortCart(selectedSearches)
      }catch(error){
        console.log(error)
      }

    }

    setLoading(false)

  }

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
        try{
          let link = await getLink(YOUTUBE_VIDEO_BASE_URL + newData[key].sourceId)
          newData[key][type] = link
          download(link + "/download.mp3", newData[key].sourceId + ".mp3")
        }catch(error){
          console.log(error)
        }
        processed++
        setLoadProgress(100*(processed)/selected.length)
    }
    setData(newData)
    setLoading(false)
    setLoadProgress(0)

  }

  const getRows = () =>{

    var compareFn

    switch(sortKey){

      case "keyword-asc":
        compareFn = (a, b) => {
          if(data[a].keyword  && data[b].keyword){
            return data[a].keyword.localeCompare(data[b].keyword)
          }else if (data[a].keyword){
            return 1
          }else if (data[b].keyword){
            return -1
          }else{
            return 0
          }
        }
        break;
      case "keyword-desc":
        compareFn = (a, b) => {
          if(data[a].keyword  && data[b].keyword){
            return data[b].keyword.localeCompare(data[a].keyword)
          }else if (data[b].keyword){
            return 1
          }else if (data[a].keyword){
            return -1
          }else{
            return 0
          }
        }
        break;
      case "spotifySuggestion-asc":
        compareFn = (a, b) => {
          if(data[b].spotifySuggestedTrack.track  && data[a].spotifySuggestedTrack.track){
            return data[a].spotifySuggestedTrack.track.localeCompare(data[b].spotifySuggestedTrack.track)
          }else if (data[a].spotifySuggestedTrack.track){
            return 1
          }else if (data[b].spotifySuggestedTrack.track){
            return -1
          }else{
            return 0
          }
        }
          break;
      case "spotifySuggestion-desc":
        compareFn = (a, b) => {
          if(data[a].spotifySuggestedTrack.track  && data[b].spotifySuggestedTrack.track){
            return data[b].spotifySuggestedTrack.track.localeCompare(data[a].spotifySuggestedTrack.track)
          }else if (data[b].spotifySuggestedTrack.track){
            return 1
          }else if (data[a].spotifySuggestedTrack.track){
            return -1
          }else{
            return 0
          }
        }
        break;
      case "key-asc":
        compareFn = (a, b) => {
          if(data[b].bpmAndKey.key!== null  && data[a].bpmAndKey.key!== null){
            return data[a].bpmAndKey.key + .5*data[a].bpmAndKey.mode - (data[b].bpmAndKey.key + .5*data[b].bpmAndKey.mode)
          }else if (data[a].bpmAndKey.key !== null){
            return 1
          }else if (data[b].bpmAndKey.key !== null){
            return -1
          }else{
            return 0
          }
        }
          break;
      case "key-desc":
        compareFn = (a, b) => {
          if(data[a].bpmAndKey.key!== null  && data[b].bpmAndKey.key!== null){
            return data[b].bpmAndKey.key + .5*data[b].bpmAndKey.mode - (data[a].bpmAndKey.key + .5*data[a].bpmAndKey.mode)
          }else if (data[b].bpmAndKey.key !== null){
            return 1
          }else if (data[a].bpmAndKey.key !== null){
            return -1
          }else{
            return 0
          }
        }
        break;
      case "bpm-asc":
        compareFn = (a, b) => {
          if(data[b].bpmAndKey.bpm  && data[a].bpmAndKey.bpm){
            return data[a].bpmAndKey.bpm - data[b].bpmAndKey.bpm
          }else if (data[a].bpmAndKey.bpm){
            return 1
          }else if (data[b].bpmAndKey.bpm){
            return -1
          }else{
            return 0
          }
        }
          break;
      case "bpm-desc":
        compareFn = (a, b) => {
          if(data[a].bpmAndKey.bpm  && data[b].bpmAndKey.bpm){
            return data[b].bpmAndKey.bpm - data[a].bpmAndKey.bpm
          }else if (data[b].bpmAndKey.bpm){
            return 1
          }else if (data[a].bpmAndKey.bpm){
            return -1
          }else{
            return 0
          }
        }
        break;

      default:
        compareFn = (a,b) => 0
    }
    let sorted_keys = Object.keys(data).sort(compareFn)
    return sorted_keys.map(key =>
      <DataRow
        setAudioSource={props.setAudioSource}
        audioSource={props.audioSource}
        key={data[key].index}
        index={data[key].index}
        accessToken={props.accessToken}
        searchResults={data[key].searchResults}
        sourceId={data[key].sourceId}
        vocalsLink={data[key].vocalsLink}
        masterLink={data[key].masterLink}
        accompanimentLink={data[key].accompanimentLink}
        bpmAndKey={data[key].bpmAndKey}
        keyword={data[key].keyword}
        selected={data[key].selected}
        handleDeleteRow={handleDeleteRow}
        handleSet={handleSet}
        audio={props.audio}
        spotifySuggestedTrack={data[key].spotifySuggestedTrack}
      />)
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
      <ColumnTitles columns={columns} sortKey={sortKey} setSortKey={setSortKey}/>
      <HorizontalSeparator/>
      <DataRowsContainer>
        {getRows()}
        <AddButton src={AddButtonImage} onClick={handleAddDataRow}/>

      </DataRowsContainer>
      <HorizontalSeparator/>
      <Buttons
        handleSelectAll={() => handleSelectAll(true)}
        handleDeselectAll={() => handleSelectAll(false)}
        handleClear={handleClear}
        handleBatchDownload={handleBatchDownload}
        handleAddSongsToBeatPortCart={handleAddSongsToBeatPortCart}
        />
      <BatchImportInputOptions accessToken={props.accessToken} batchSearch={batchSearch}/>
      {loading?  loadingScreen(): null}

    </WorkspaceContainer>
  )
}
