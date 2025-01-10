import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.takeit.ciph3r.co/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
