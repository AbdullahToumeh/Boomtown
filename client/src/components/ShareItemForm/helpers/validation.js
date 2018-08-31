export default function validate(values) {
  const errors = {}

    
    if(!values.description) {
      errors.description = 'Required'
    }
    if(!values.title) {
      errors.title = 'Required'
    }
    if(!values.tags || values.tags.ength === 0 ) {
      errors.tags ='you Should select tags'
    }
    return errors
  

  return errors
}
