import React, { useRef } from 'react'

const InputTag = ({ tags, handleAddition, handleDelete, handleValidate }) => {
  const tagInput = useRef(null)

  const removeTag = (i) => handleDelete(i)

  const inputKeyDown = (e) => {
    const val = e.target.value

    if (e.key === 'Enter' && val) {
      if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        return
      }

      if (handleValidate) {
        const isValid = handleValidate(val)

        if (isValid) {
          handleAddition(val)

          tagInput.current.value = null
        }
      } else {
        handleAddition(val)

        tagInput.current.value = null
      }
    } else if (e.key === 'Backspace' && !val) {
      console.log('hey')
      removeTag(tags.length - 1)
    }
  }


  return (
    <div>
      <ul>
        {tags.map((tag, i) => (
          <li
            key={tag}
          >
            <button
              className='tag button mb-2'
              onClick={() => removeTag(i)}
            >
              <span>{tag}</span>
              <span className='icon is-small'>
                <i className='fas fa-times' />
              </span>
            </button>
          </li>
        ))}
        <li>
          <input
            ref={tagInput}
            className='input'
            onKeyDown={inputKeyDown}
            type='email'
          />
        </li>
      </ul>
    </div>
  )
}

export default InputTag
