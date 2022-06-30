import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './page-header.style';

const PageHeader = ({ title }) => {
 const classes = useStyles();

 return <h1 className={`title ${classes.title}`}>{title}</h1>;
};

PageHeader.propTypes = {
 title: PropTypes.string,
};

export default PageHeader;
