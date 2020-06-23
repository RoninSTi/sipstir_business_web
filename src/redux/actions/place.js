import { FETCH_PLACES } from '@actions/types'

export const fetchGooglePlacesAction = ({ query }) => ({
  type: FETCH_PLACES,
  payload: {
    client: 'googlePlace',
    request: {
      method: 'get',
      params: {
        input: query,
        inputtype: 'textquery',
        fields: 'photos,description,name,rating'
      }
    }
  }
})
