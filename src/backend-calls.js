import { BACKEND_URL } from './config'
import axios from 'axios'

export const getDownloadLink = async(url) =>{
    const result = await axios.get(BACKEND_URL + `/download/?url=${url}`)
    return result.data.master
}

export const getVocalsLink = async(url) =>{
    const result = await axios.get(BACKEND_URL + `/split/?url=${url}`)
    return result.data.vocals
}

export const getAccompanimentLink = async(url) =>{
    const result = await axios.get(BACKEND_URL + `/split/?url=${url}`)
    return result.data.accompaniment
}
