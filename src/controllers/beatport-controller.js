import { BEATPORT_BACKEND_URL } from '../config'

export const addSongsToBeatPortCart = async (un, pw, songs) =>{
  const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: un,
          password: pw,
          searches: songs
        })
    };

  const result = await fetch(BEATPORT_BACKEND_URL + "/addToCart", requestOptions)
                          .then(response => response.json())
  return result

}

export const getBotStatus = async (botId) =>{
  const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

  const result = await fetch(BEATPORT_BACKEND_URL + `/status/${botId}`, requestOptions)
                          .then(response => response.json())
  console.log(result)
  return result

}
