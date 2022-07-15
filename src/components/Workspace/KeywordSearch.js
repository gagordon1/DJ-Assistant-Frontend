import styled from 'styled-components'
import React from 'react'
import { youtubeSearch } from '../../controllers/youtube-controller'
import { searchSpotifyTracks, getAudioFeatures} from '../../controllers/spotify-controller'
import { SearchBar } from '../SearchBar'

const KeywordSearchContainer = styled.div`
  display : flex;
  align-items : center;
  justify-content : space-between;
  width : 200px;
  height : 80%;
  background : none;
  margin-right : 10px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
`


const placeholder = "Keyword..."



export default function KeywordSearch(props){

  const searchInput = React.useRef(null)

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

  const loadKeyAndBpm = async(spotifyId) =>{
      let result = await getAudioFeatures(props.accessToken, spotifyId)
      let bpmAndKey = {bpm : result.tempo, key : result.key, mode : result.mode}
      return bpmAndKey
    }

  const handleKeyDown = async (e) =>{
    if (e.key === "Enter"){
      if (document.activeElement === searchInput.current) {
        const results = await youtubeSearch(props.keyword)
        props.handleSet(props.index, "searchResults", results)
        if(props.accessToken){
          const spotifySuggestedTrack = await getSuggestion(props.keyword)
          props.handleSet(props.index, "spotifySuggestedTrack", spotifySuggestedTrack)

          let bpmAndKey = await loadKeyAndBpm(spotifySuggestedTrack.spotifyId)
          props.handleSet(props.index, "bpmAndKey", bpmAndKey)
        }

      }
    }
  }
  return (
    <KeywordSearchContainer>

      <SearchBar placeholder={placeholder}
                onChange={(e) => props.handleSet(props.index, "keyword", e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
                ref={searchInput}
                defaultValue={props.keyword}
                />

    </KeywordSearchContainer>
  )
}
