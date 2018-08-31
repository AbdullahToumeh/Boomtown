import React, { Component, Fragment } from 'react'
import { FormSpy, Form, Field,  } from 'react-final-form'
import { Button, TextField, Checkbox, InputLabel,Typography, FormControl } from '@material-ui/core'
import ItemsContainer from '../../containers/ItemsContainer'
import { connect } from 'react-redux'
import {
  resetImage,
  updateNewItem,
  resetNewItem
} from '../../redux/modules/ShareItemPreview'
import styles from './styles'
import { withStyles } from '@material-ui/core/styles'
import validate from './helpers/validation'

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


  handleSubmitMessage() {
    this.setState({ submitted: true })
  }

  //converts an image to base64 string
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
    if (!values.imageurl && this.state.fileSelected) {
      this.getBase64Url().then(imageurl => {
        updateNewItem({
          imageurl
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
    this.setState({
      selectedTags: event.target.value
    })
    this.validateTags()
  }

  generateTagsText(tags, selected) {
    return tags
      .map(t => (selected.indexOf(t.id) > -1 ? t.title : false))
      .filter(e => e)
      .join(', ')
  }

  handleTagsPristine() {
    this.setState({ tagsPristine: false })

    this.validateTags()
  }

  handleImageSelect(event){
    this.setState( {fileSelected: event.target.files[0]})
  }

  async saveItem(values, addItem) {
    const {
      validity,
      files: [file]
    } = this.fileRef.current

    if (!validity.valid || !file)return

      const t = values.tags.map(t => {
        let tag = JSON.parse(t)
        delete tag.__typename
        return tag
      })

      try {
        const itemData = {
          ...values,
          tags: t
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

    uploadViewer(viewer, values, updateNewItem) {
      this.props.updateNewItem({
        ...values,
        itemowner: {
          fullname: viewer.fullname,
          email: viewer.email
        }
      })
    }

    handleShareReset(resetImage, resetNewItem) {
      this.setState({ selectedTags: [] })
      this.setState({ fileSelected: false })
      resetImage()
      resetNewItem()
      this.handleSubmitMessage()
    }
    
  render() {
    const { resetImage, updateNewItem, resetNewItem } = this.props
    const { classes } = this.props
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

          <Form onSubmit={ values => {this.saveItem(values, addItem)}}
            validate={validate}
            render={({ handleSubmit, pristine, invalid, values, form }) => (
              <form
                className={classes.form}
                onSubmit={event => {
                handleSubmit(event)
                form.reset()
                this.handleShareReset(resetImage, resetNewItem)
                }}
              >
                <FormSpy
                  subscription={{ values: true }}
                  component={({ values }) => {
                    if (values) {
                      this.dispatchUpdate(values, updateNewItem)
                    }
                    return ''
                  }}
                />
                  <Typography variant="display2" >
                    Share. Borrow. Prosper.
                  </Typography>

                  <Field
                   name="imageurl"
                    render={({input, meta}) => (
                      <Fragment>
                        <Button
                          onClick={() => {
                            this.fileRef.current.click()
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
                <FormControl>
                   <Button 
                      type="submit" 
                      variant="contained" 
                      color="primary" 
                      disabled={pristine || invalid || !this.state.fileSelected}
                    >
                      Share
                    </Button>
                </FormControl>

              <Typography>
                {this.state.submitted
                ? 'Thank you for submission'
                : '' }               
              </Typography>
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
)(withStyles(styles)(ShareItemForm))
