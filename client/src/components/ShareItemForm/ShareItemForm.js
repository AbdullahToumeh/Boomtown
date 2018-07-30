import React, { Component, Fragment } from 'react'
import { FormSpy, Form, Field } from 'react-final-form'
import { Button, TextField, Checkbox, InputLabel,Typography } from '@material-ui/core'
import ItemsContainer from '../../containers/ItemsContainer'
import { connect } from 'react-redux'
import {
  resetImage,
  updateNewItem,
  resetNewItem
} from '../../redux/modules/ShareItemPreview'
import styles from './styles'

class ShareItemForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileSelected: false,
      selectedTags: [],
      submitted: false
    }
    this.fileRef = React.createRef();
  }
  // onSubmit = values => {
  //   this.saveItem(values, addItem)
  // }
  validate = values => {
    console.log(values)
  }
  getBase64Url() {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = e => {
        resolve(
          `data:${this.state.fileSelected.mimeType};base64, ${btoa(
            e.target.result
          )}`
        )
      }
      reader.readAsBinaryString(this.state.fileSelected)
    })
  }

  applyTags(tags) {
    return (
      tags &&
      tags
        .filter(tag => this.state.selectedTags.indexOf(tag.id) > -1)
        .map(tag => ({ title: tag.title, id: tag.id }))
    )
  }

  getTags = tags => {
    if(tags) {
      return tags.map(tag => JSON.parse(tag))
    }
    return []
  }
  

  dispatchUpdate(values, updateNewItem) {
    if (!values.imageUrl && this.state.fileSelected) {
      this.getBase64Url().then(imageUrl => {
        updateNewItem({
          imageUrl
        })
      })
    }

    const tags = this.getTags(values.tags)
    updateNewItem({
      ...values,
      tags
    })
  }
  handleCheckbox(event) {
  }
  handleImageSelect(event){
    this.setState( {fileSelected: event.target.files[0]})
  }

  async saveItem(values, tags, addItem) {
    const {
      validity,
      files: [file]
    } = this.fileInput.current

    if (!validity.valid || file)return; 

      try {
        const itemData = {
          ...values,
          tags: this.applyTags(tags)
        }
        await addItem.mutation({
          variables: {
            item: itemData,
            image: file
          }
        })
        this.setState({ done: true})
      } catch (e) {
        console.log(e)
      }
    }
    
  

  render() {
    const { resetImage, updateNewItem, resetNewItem } = this.props
    return (
      <ItemsContainer>
        {({ addItem, tagData: { loading, error, tags  } }) => {
          if (loading) {
            return 'Content Loading...'
          }
          if (error) {
            return `error: ${error.message}`
          }
          return (
          <Form
            onSubmit={ values => {
              this.saveItem(values, addItem)
            }}
            validate={this.validate}
            render={({ handleSubmit, pristine, invalid, values }) => (
              <form onSubmit={handleSubmit}>
                <FormSpy
                  subscription={{ values: true }}
                  component={({ values }) => {
                    if (values) {
                      this.dispatchUpdate(values, updateNewItem)
                    }
                    return ''
                  }}
                />
                  <Typography variant="display4" >
                    Share. Borrow. Prosper.
                  </Typography>
                  <Field
                   name="imageurl"
                    render={({input, meta}) => (
                      <Fragment>
                        <Button
                          onClick={() => {
                            this.fileRef.current.click()
                            // TODO: if i click this and there is an image
                            // selected already, clear the image from  the state
                            // and start over
                          }}
                        >
                          Upload an Image!
                        </Button>
                        <input
                          onChange={e => this.handleImageSelect(e)}
                          type="file"
                          accept="image/*"
                          hidden
                          ref={this.fileRef}
                        />
                      </Fragment>
                    )}
                  />
                <Field name="title">
                  {({ input, meta }) => (
                    <TextField placeholder="Name your Item" {...input} />
                  )}
                </Field>
                <Field name="description">
                  {({ input, meta }) => (
                    <TextField
                      placeholder="Describe your Item"
                      multiline
                      {...input}
                    />
                  )}
                </Field>
                {tags && tags.map(tag => (
                  <Field
                    key={tag.id}
                    name="tags"
                    type="checkbox"
                    value={JSON.stringify(tag)}
                  >
                    {({ input, meta }) => (
                      <InputLabel>
                        <Checkbox {...input} />
                          {tag.title}
                      </InputLabel>
                    )}
                  </Field>
                ))}              
                <Field
                  render={({ input, meta }) => (
                    <Button type="submit" variant="contained" color="primary">
                      Share
                    </Button>
                  )}
                />
              </form>
            )}
          />
          )
        }}
      </ItemsContainer>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  updateNewItem(item) {
    console.log(item)
    dispatch(updateNewItem(item))
  },
  resetNewItem() {
    dispatch(resetNewItem())
  },
  resetImage() {
    dispatch(resetImage())
  }
})

export default connect(
  undefined,
  mapDispatchToProps
)(ShareItemForm)