import axios from 'axios'

const defaultClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000
})

const googlePlaceClient = axios.create({
  baseURL: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?&key=${process.env.REACT_APP_GOOGLE_PLACE_API_KEY}`
})

const clients = {
  default: {
    client: defaultClient
  },
  googlePlace: {
    client: googlePlaceClient
  }
}

export default clients
