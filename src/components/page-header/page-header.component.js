import React from 'react'

import useStyles from './page-header.style'

const PageHeader = ({ title }) => {
  const classes = useStyles()

  return (
    <h1 className={`title ${classes.title}`}>{title}</h1>
  )
}

export default PageHeader
