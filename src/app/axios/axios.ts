import axios from 'axios'
import { REACT_APP_API_URL } from 'src/features/store/consts/consts'

const instance = axios.create({
	baseURL: REACT_APP_API_URL
})

export default instance
