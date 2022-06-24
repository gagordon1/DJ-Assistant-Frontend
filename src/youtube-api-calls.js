import axios from 'axios'


export const youtubeSearch = async (query) =>{

  let result = await axios.get("https://www.googleapis.com/youtube/v3/search",{
    params : {
      part : "snippet",
      q : "Everyday we lit"
    }
  })

  console.log(result);

}
