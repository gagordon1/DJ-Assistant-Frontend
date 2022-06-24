import axios from 'axios'
import {YOUTUBE_API_BASE_URL} from './config'


export const youtubeSearch = async (query) =>{

  let result = await axios.get(YOUTUBE_API_BASE_URL + "/search",{
    params : {
      part : "snippet",
      q : query,
      key : process.env.REACT_APP_GOOGLE_API_KEY
    }
  })

  return result.data.items.map(obj =>{return {
    title : obj.snippet.title,
    channelId : obj.snippet.channelId,
    id : obj.id.videoId,
    thumbnail : obj.snippet.thumbnails.medium.url

  }})

}
