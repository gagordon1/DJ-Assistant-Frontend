import { BEATPORT_BACKEND_URL } from '../config'

export const addSongsToBeatPortCart = async (songs) =>{
  const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: process.env.REACT_APP_TEST_BEATPORT_USERNAME,
          password: process.env.REACT_APP_TEST_BEATPORT_PASSWORD,
          searches: songs.join("%20")
        })
    };

  const result = await fetch(BEATPORT_BACKEND_URL + "/addToCart", requestOptions)
                          .then(response => response.json())
  console.log(result)

}
