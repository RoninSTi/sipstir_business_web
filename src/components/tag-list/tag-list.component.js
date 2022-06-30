import React from 'react';
import PropTypes from 'prop-types';

const TagList = ({ items, onDelete }) => {
 return (
  <div className="field is-grouped is-grouped-multiline">
   {items.map((item, index) => (
    <div key={`${item.text}-${index}`} className="tag">
     {item.text}
     <button className="delete is-small" onClick={() => onDelete(index)} />
    </div>
   ))}
  </div>
 );
};

TagList.propTypes = {
 items: PropTypes.arrayOf(PropTypes.string),
 onDelete: PropTypes.func,
};

export default TagList;
