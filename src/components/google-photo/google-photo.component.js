import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './google-photo.style';

const GooglePhoto = ({ photoreference, size }) => {
 const baseUrl = `https://maps.googleapis.com/maps/api/place/photo?key=${process.env.REACT_APP_GOOGLE_PLACE_API_KEY}&photoreference=${photoreference}`;

 let url = baseUrl;

 if (size) {
  url = `${url}&maxheight=${size}`;
 }

 const classes = useStyles({ size, url });

 if (!photoreference) return null;

 return (
  <figure className={`image ${classes.container}`}>
   <div className={classes.image} />
  </figure>
 );
};

GooglePhoto.propTypes = {
 photoreference: PropTypes.string,
 size: PropTypes.number,
};
export default GooglePhoto;
