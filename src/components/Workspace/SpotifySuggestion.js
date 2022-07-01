import { useEffect } from 'react'
import {searchSpotifyTracks} from '../../controllers/spotify-controller'
import styled from 'styled-components'

const TrackInfo = styled.div`
  display : flex;
  width : 128px;
  padding : 10px;
  flex-direction : column;
  justify-content : center;
  margin-top : auto;
  margin-bottom : auto;
  align-items : center;
`


export default function SpotifySuggestion(props){


  useEffect(()=>{
    const getSuggestion = async() =>{
      try{
        let suggestion = await searchSpotifyTracks(props.accessToken, props.keyword)
        let spotifySuggestedTrack = {
          track : suggestion.name,
          artist : suggestion.artists.map(obj => obj.name).join(", "),
          spotifyId : suggestion.id
        }
        props.handleSet(props.index, "spotifySuggestedTrack", spotifySuggestedTrack)
      }
      catch(error){
        console.log("Could not get spotify search data...")
      }

    }
    if(props.keyword){
      getSuggestion()
    }
  }, [props.sourceId]) //when sourceId changes

  return (
    <TrackInfo>
      <a> {props.spotifySuggestedTrack.track} </a>
      <a> {props.spotifySuggestedTrack.artist} </a>

    </TrackInfo>
  )
}
