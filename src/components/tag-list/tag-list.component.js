import React from 'react'

const TagList = ({ items, onDelete }) => {
  return (
    <div className='field is-grouped is-grouped-multiline'>
      {items.map((item, index) => (
        <div
          key={`${item.text}-${index}`}
          className='tag'
        >
          {item.text}
          <button
            className='delete is-small'
            onClick={() => onDelete(index)}
          />
        </div>
      ))}
    </div>
  )
}

export default TagList
