import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ReactGoogleMapLoader from 'react-google-maps-loader';
import ReactGooglePlacesSuggest from 'react-google-places-suggest';

const GooglePlaceSelect = ({ onSelectSuggest }) => {
 const [value, setValue] = useState('');

 const [search, setSearch] = useState('');

 const handleChange = (e) => {
  const { value: v } = e.target;

  setSearch(v);
  setValue(v);
 };

 const handleSelectSuggest = (_, originalPrediction) => {
  onSelectSuggest({ value: originalPrediction.place_id });

  setSearch('');
  setValue(originalPrediction.description);
 };

 return (
  <ReactGoogleMapLoader
   params={{
    key: process.env.REACT_APP_GOOGLE_PLACE_API_KEY,
    libraries: 'places,geocode',
   }}
   render={(googleMaps) =>
    googleMaps && (
     <ReactGooglePlacesSuggest
      autocompletionRequest={{
       input: search,
       fields: 'photos,description,name,rating',
       // Optional options
       // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
      }}
      customRender={(prediction) => (
       <div className="customWrapper">
        {prediction ? prediction.description : 'No places match your search'}
       </div>
      )}
      // Optional props
      googleMaps={googleMaps}
      // onNoResult={this.handleNoResult}
      onSelectSuggest={handleSelectSuggest}
      // onStatusUpdate={this.handleStatusUpdate} // null or "" if you want to disable the no results item
      textNoResults="No places match your search"
     >
      <input
       autoComplete="off"
       className="input"
       id="account-google-place-input"
       name="location"
       onChange={handleChange}
       type="text"
       value={value}
      />
     </ReactGooglePlacesSuggest>
     // eslint-disable-next-line indent
    )
   }
  />
 );
};

GooglePlaceSelect.propTypes = {
 onSelectSuggest: PropTypes.func,
};

export default GooglePlaceSelect;
