import React, { useRef } from 'react'

import { useSelector } from 'react-redux'

import apiClients from '@services/api'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const api = apiClients.default.client

const ImageUpload = ({ onComplete, onProgress }) => {
  const fileInput = useRef(null)

  const token = useSelector(state => state.auth.token)

  const handleFile = async () => {
    const file = fileInput.current.files[0]
    const fileParts = file.name.split('.')
    // eslint-disable-next-line no-unused-vars
    const [fileName, fileType] = fileParts

    const fileId = uuidv4()

    try {
      const response = await api({
        method: 'post',
        url: 'upload/signedurl/image',
        data: {
          fileName: fileId,
          fileType
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const { signedRequest, url } = response.data

      const options = {
        headers: {
          'Content-Type': fileType
        },
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length')
          if (totalLength !== null) {
            const progress = Math.round((progressEvent.loaded * 100) / totalLength)

            const progressData = {
              progress,
              isUploading: progress < 1
            }

            if (onProgress) onProgress(progressData)
          }
        }
      }

      await axios.put(signedRequest, file, options)

      onComplete({ fileUrl: url })
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <div className='file'>
      <label className='file-label'>
        <input
          ref={fileInput}
          className='file-input'
          name='resume'
          onChange={handleFile}
          type='file'
        />
        <span className='file-cta is-info'>
          <span className='file-icon'>
            <i className='fas fa-upload' />
          </span>
          <span className='file-label'>
            Change Photo
          </span>
        </span>
      </label>
    </div>
  )
}

export default ImageUpload
