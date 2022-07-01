import axios from 'axios';
import {encode as base64_encode} from 'base-64';
import * as qs from 'qs'
import { TOKEN_AUTH_ENDPOINT, CLIENT_ID, REDIRECT_URI, CLIENT_SECRET,
  SPOTIFY_API_URL, TOP_ITEMS_ENDPOINT, ARTISTS_ENDPOINT,
  SEARCH_ENDPOINT, AUDIO_FEATURES_ENDPOINT } from '../config'


export const authorizeFromCode = async (authCode) =>{

  const params = qs.stringify(
    {
      "code" : authCode,
      "redirect_uri" : REDIRECT_URI,
      "grant_type" : "authorization_code"
    }
  )
  const response = await fetch(
    TOKEN_AUTH_ENDPOINT,
    {
      method : "POST",
      headers: {
        "Content-Type" : "application/x-www-form-urlencoded",
        "Authorization" : "Basic " + base64_encode(CLIENT_ID + ":" + CLIENT_SECRET)
      },
      body : params
    }
  )
  return response.json()
}

export const searchSpotifyTracks = async (accessToken, search) =>{


    let config = {
      headers : {
        'Authorization' : 'Bearer ' + accessToken,
        'Content-Type' : 'application/json'
      },
      params : {
        q : search,
        type : "track",
        limit : 1
      }
    }
    const response = await axios.get(
      SPOTIFY_API_URL + SEARCH_ENDPOINT,
      config
    )
    const result = response.data.tracks.items[0]
    return result

}

export const getAudioFeatures = async (accessToken, id) =>{


    let config = {
      headers : {
        'Authorization' : 'Bearer ' + accessToken,
        'Content-Type' : 'application/json'
      }
    }
    const response = await axios.get(
      SPOTIFY_API_URL + AUDIO_FEATURES_ENDPOINT + id,
      config
    )
    return response.data

}
