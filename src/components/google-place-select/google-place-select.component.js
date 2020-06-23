import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import ReactGoogleMapLoader from 'react-google-maps-loader'
import ReactGooglePlacesSuggest from 'react-google-places-suggest'
import { CREATE_ACCOUNT_UPDATE_FORM } from '../../redux/actions/types'

const GooglePlaceSelect = () => {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [value, setValue] = useState('')

  const handleChange = e => {
    const { value: v } = e.target

    setSearch(v)
    setValue(v)
  }

  const handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    dispatch({
      type: CREATE_ACCOUNT_UPDATE_FORM,
      payload: {
        name: 'placeId',
        value: geocodedPrediction.place_id
      }
    })
    setValue(originalPrediction.description)
  }

  return (
    <div className='field'>
      <label className='label'>Google Place</label>
      <div className='control'>
        <ReactGoogleMapLoader
          params={{
            key: process.env.REACT_APP_GOOGLE_PLACE_API_KEY,
            libraries: 'places,geocode'
          }}
          render={googleMaps =>
            googleMaps && (
              <ReactGooglePlacesSuggest
                autocompletionRequest={{
                  input: search,
                  fields: 'photos,description,name,rating'
                  // Optional options
                  // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                }}
                customRender={prediction => (
                  <div className='customWrapper'>
                    {prediction
                      ? prediction.description
                      : 'No places match your search'}
                  </div>
                )}
                // Optional props
                googleMaps={googleMaps}
                // onNoResult={this.handleNoResult}
                onSelectSuggest={handleSelectSuggest}
                // onStatusUpdate={this.handleStatusUpdate} // null or "" if you want to disable the no results item
                textNoResults='No places match your search'
              >
                <input
                  className='input'
                  onChange={handleChange}
                  placeholder='Search a location'
                  type='text'
                  value={value}
                />
              </ReactGooglePlacesSuggest>
            // eslint-disable-next-line indent
          )}
        />
      </div>
    </div>

  )
}

export default GooglePlaceSelect
