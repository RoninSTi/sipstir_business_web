import React, { useState, useRef } from 'react'

import { useSelector } from 'react-redux'

import apiClients from '@services/api'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

const api = apiClients.default.client

const ImageUpload = ({ label, onComplete, onProgress }) => {
  const fileInput = useRef(null)

  const [fileName, setFileName] = useState('')

  const token = useSelector(state => state.auth.token)

  const handleFile = async () => {
    const file = fileInput.current.files[0]
    const fileParts = file.name.split('.')
    const [localFileName, fileType] = fileParts

    setFileName(localFileName)

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
            const progressData = Math.round((progressEvent.loaded * 100) / totalLength)

            onProgress({ progressData })
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
    <div className='field'>
      <label className='label'>{label}</label>
      <div className='file has-name'>
        <label className='file-label'>
          <input
            ref={fileInput}
            className='file-input'
            name='resume'
            onChange={handleFile}
            type='file'
          />
          <span className='file-cta'>
            <span className='file-icon'>
              <i className='fas fa-upload' />
            </span>
            <span className='file-label'>
              Choose a file…
            </span>
          </span>
          <span className='file-name'>
            {fileName}
          </span>
        </label>
      </div>
    </div>
  )
}

export default ImageUpload
