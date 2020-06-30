import React from 'react'

const GooglePhoto = ({ photoreference, maxheight, maxwidth }) => {
  const baseUrl = `https://maps.googleapis.com/maps/api/place/photo?key=${process.env.REACT_APP_GOOGLE_PLACE_API_KEY}&photoreference=${photoreference}`

  let url = baseUrl

  if (maxheight) {
    url = `${url}&maxheight=${maxheight}`
  }

  if (maxwidth) {
    url = `${url}&maxwidth=${maxwidth}`
  }

  return <img
    alt='google place'
    src={url}
  />
}

export default GooglePhoto
