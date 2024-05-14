import axios from 'axios'

export const BaseURL = "http://192.168.1.9:5100/api/v1"
const TIME_OUT = 30000

export const customRequest = axios.create({
    baseURL: BaseURL,
    timeout: TIME_OUT
})
