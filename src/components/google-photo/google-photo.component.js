import React from 'react'

import useStyles from './google-photo.style'

const GooglePhoto = ({ photoreference, size }) => {
  const baseUrl = `https://maps.googleapis.com/maps/api/place/photo?key=${process.env.REACT_APP_GOOGLE_PLACE_API_KEY}&photoreference=${photoreference}`

  let url = baseUrl

  if (size) {
    url = `${url}&maxheight=${size}`
  }

  const classes = useStyles({ size, url })

  return (
    <figure className={`image ${classes.container}`}>
      <div className={classes.image} />
    </figure>
  )
}

export default GooglePhoto
