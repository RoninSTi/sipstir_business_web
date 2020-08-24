import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { updateAccountAction } from '@redux/actions/account'

import GooglePhoto from '@components/google-photo/google-photo.component'
import ImageUpload from '@components/image-upload/image-upload.component'

import useStyles from './account-box.style'

const AccountBox = props => {
  const classes = useStyles(props)

  const dispatch = useDispatch()

  const [uploadProgress, setUploadProgress] = useState(0)

  const account = useSelector(state => state.account.activeAccount)

  const token = useSelector(state => state.auth.token)

  const handleOnComplete = ({ fileUrl }) => {
    const data = {
      ...account,
      image: fileUrl
    }

    dispatch(updateAccountAction({ accountId: account?.id, token, ...data }))
  }

  const handleOnProgress = ({ progress }) => {
    setUploadProgress(progress)
  }

  return (
    <div className='container'>
      <h5 className={`title is-5 ${classes.boxTitle}`}>Business</h5>
      <div className='columns'>
        <div className='column is-one-third'>
          {account?.image ? <img
            alt='business'
            className={classes.accountImage}
            src={`${account.image}?w=120&h=120&fit=crop`}
          />
            : <GooglePhoto
              // eslint-disable-next-line camelcase
              photoreference={account?.location?.photo?.photo_reference}
              size={200}
            />}
          {uploadProgress > 0 && uploadProgress < 100 &&
            <progress
              className='progress is-small is-info'
              max='100'
              value={uploadProgress}
            >{`${uploadProgress}%`}
            </progress>}
        </div>
        <div className='column'>
          <div className={classes.info}>
            <div>
              <span className={classes.businessTitle}>{account?.name || 'Account name'}</span>
            </div>
            <div className='mb-5'>
              <span className={classes.businessVicinity}>{account?.location?.vicinity || 'Location vicinity'}</span>
            </div>
            <ImageUpload
              onComplete={handleOnComplete}
              onProgress={handleOnProgress}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountBox
