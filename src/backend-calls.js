import { BACKEND_URL } from './config'
import axios from 'axios'

export const getDownloadLink = async(url) =>{
    const result = await axios.get(BACKEND_URL + `/download/?url=${url}`)
    return result.data.master
}
