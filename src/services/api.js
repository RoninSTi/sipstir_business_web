import axios from 'axios'

const defaultClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000
})

const clients = {
  default: {
    client: defaultClient
  }
}

export default clients
