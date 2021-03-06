import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import ReactDropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { requestData } from 'redux-thunk-data'

import { API_THUMBS_URL } from 'utils/config'

import { imagePlugin } from './plugins'


const { addImage } = imagePlugin

export class RawImageDropzone extends PureComponent {
  constructor () {
    super()
    this.state = {
      isLoading: false
    }
  }

  handleUploadSuccess = (state, action) => {
    const { payload: { datum } } = action
    const { getEditorState, setEditorState } = this.props

    const imageId = datum.id
    const src = `${API_THUMBS_URL}/images/${imageId}`

    this.setState({ isLoading: false }, () => {
      const editorState = getEditorState()
      const editorStateWithImage = addImage(editorState, src)
      setEditorState(editorStateWithImage)
    })

  }

  handleUploadImage = files => {
    const { dispatch } = this.props

    const image = files[0]

    const body = new FormData()

    body.append('thumb', image)

    this.setState({ isLoading: true })

    dispatch(
      requestData({
        apiPath: '/images',
        body,
        handleFail: () => this.setState({ isLoading: false }),
        handleSuccess: this.handleUploadSuccess,
        method: 'POST'
      })
    )
  }

  render () {
    const { render } = this.props
    const { isLoading } = this.state

    const reactDropzoneProps = {...this.props}
    delete reactDropzoneProps.children
    delete reactDropzoneProps.dispatch
    delete reactDropzoneProps.editorState
    delete reactDropzoneProps.render
    delete reactDropzoneProps.setEditorState

    const renderProps = {
      handleUploadImage: this.handleUploadImage,
      isLoading
    }

    return (
      <ReactDropzone
        {...reactDropzoneProps}
        onDrop={this.handleUploadImage}
      >
        {reactDropzoneRenderProps =>
          render({ ...renderProps, ...reactDropzoneRenderProps })}
      </ReactDropzone>
    )
  }
}

RawImageDropzone.propTypes = {
  dispatch: PropTypes.func.isRequired,
  getEditorState: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
}

const ImageAddButton = connect()(RawImageDropzone)

export default ImageAddButton
