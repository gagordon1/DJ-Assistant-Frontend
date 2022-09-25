import styled from 'styled-components'
import { colors } from '../../Theme'
import { useState } from 'react'
import DataRow from './DataRow'
import ColumnTitles from './ColumnTitles'
import { CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { widths } from '../../Theme'
import Navbar from '../Navbar'

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const ProgressBarContainer = styled.div`
  position: fixed;
  width : 200px;
  height : 200px;
  top : 50%;
  left : 50%;
  margin-left: -100px;
  margin-top: -100px;
  justify-content : center;
  transform : translate(0, -50px);
  &:hover{
    cursor : pointer;
  }
`


const LoaderBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index:99;
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
  const [columns] = useState(["Title", "Artist", "Key", "BPM"])
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const [loadProgress, setLoadProgress] = useState(0)
  const [sortKey, setSortKey] = useState("default")

  const getRows = () =>{

    var compareFn

    switch(sortKey){

      case "spotifySuggestion-asc":
        compareFn = (a, b) => {
          if(data[b].track  && data[a].track){
            return data[a].track.localeCompare(data[b].track)
          }else if (data[a].track){
            return 1
          }else if (data[b].track){
            return -1
          }else{
            return 0
          }
        }
          break;
      case "spotifySuggestion-desc":
        compareFn = (a, b) => {
          if(data[a].track  && data[b].track){
            return data[b].track.localeCompare(data[a].track)
          }else if (data[b].track){
            return 1
          }else if (data[a].track){
            return -1
          }else{
            return 0
          }
        }
        break;
      case "key-asc":
        compareFn = (a, b) => {
          if(data[b].key!== null  && data[a].key!== null){
            return data[a].key + .5*data[a].mode - (data[b].key + .5*data[b].mode)
          }else if (data[a].key !== null){
            return 1
          }else if (data[b].key !== null){
            return -1
          }else{
            return 0
          }
        }
          break;
      case "key-desc":
        compareFn = (a, b) => {
          if(data[a].key!== null  && data[b].key!== null){
            return data[b].key + .5*data[b].mode - (data[a].key + .5*data[a].mode)
          }else if (data[b].key !== null){
            return 1
          }else if (data[a].key !== null){
            return -1
          }else{
            return 0
          }
        }
        break;
      case "bpm-asc":
        compareFn = (a, b) => {
          if(data[b].bpm  && data[a].bpm){
            return data[a].bpm - data[b].bpm
          }else if (data[a].bpm){
            return 1
          }else if (data[b].bpm){
            return -1
          }else{
            return 0
          }
        }
          break;
      case "bpm-desc":
        compareFn = (a, b) => {
          if(data[a].bpm  && data[b].bpm){
            return data[b].bpm - data[a].bpm
          }else if (data[b].bpm){
            return 1
          }else if (data[a].bpm){
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
    return sorted_keys.map((key, i) =>
      <DataRow
        key = {i}
        track = {data[key].title}
        artist = {data[key].artist}
        musicalKey = {data[key].key}
        bpm = {data[key].bpm}
        mode = {data[key].mode}
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
      <Navbar accessToken={props.accessToken} setData={setData}
          loading={loading} loadingScreen={loadingScreen}/>
      <ColumnTitles columns={columns} sortKey={sortKey} setSortKey={setSortKey}/>
      <HorizontalSeparator/>
      <DataRowsContainer>
        {getRows()}
      </DataRowsContainer>
      <HorizontalSeparator/>

    </WorkspaceContainer>
  )
}
