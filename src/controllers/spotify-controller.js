import axios from 'axios';
import {encode as base64_encode} from 'base-64';
import * as qs from 'qs'
import { TOKEN_AUTH_ENDPOINT, CLIENT_ID, REDIRECT_URI, CLIENT_SECRET,
  SPOTIFY_API_URL, PLAYLISTS_ENDPOINT, SEARCH_ENDPOINT,
  AUDIO_FEATURES_ENDPOINT } from '../config'


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
    console.log(result)
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

export const getBulkAudioFeatures = async (accessToken, spotifyIds) =>{

    let idList = [...spotifyIds]
    let out = []
    while (idList.length > 0){
      let batch = idList.slice(0,100)
      let ids = batch.join(",")
      let config = {
        headers : {
          'Authorization' : 'Bearer ' + accessToken,
          'Content-Type' : 'application/json'
        },
        params : {
          ids : ids
        }
      }
      let response = await axios.get(
        SPOTIFY_API_URL + AUDIO_FEATURES_ENDPOINT,
        config
      )
      idList = idList.filter(id => !batch.includes(id))
      out = [...out,...response.data.audio_features]
    }
    return out


}

export const getPlaylists = async (accessToken) =>{

  let config = {
    headers : {
      'Authorization' : 'Bearer ' + accessToken,
      'Content-Type' : 'application/json'
    },
    params : {
      limit : 50
    }
  }
  const response = await axios.get(
    SPOTIFY_API_URL + PLAYLISTS_ENDPOINT,
    config
  )
  return response.data

}

export const getPlaylistTracks = async (accessToken, endpoint) => {


  let out = []
  let offset = 0
  let limit = 50
  var result;
  while (offset === 0 || result.length > 0){
    let config = {
      headers : {
        'Authorization' : 'Bearer ' + accessToken,
        'Content-Type' : 'application/json'
      },
      params : {
        offset : offset,
        limit : limit
      }
    }
    const response = await axios.get(
      endpoint,
      config
    )
    result = response.data.items
    out = [...out, ...result]
    offset += limit
  }
  return out

}

export const authorizeFromRefreshToken = async (refreshToken) =>{

  const params = qs.stringify(
    {
      "refresh_token" : refreshToken,
      "grant_type" : "refresh_token"
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
