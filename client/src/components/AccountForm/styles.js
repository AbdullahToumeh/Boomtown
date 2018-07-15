const styles = theme => ({
  formControl: {
    marginBottom: theme.spacing.unit * 2,
    width: '100%'
  },
  formButton: {
    marginTop: theme.spacing.unit * 2
  },
  formToggle: {
    background: 'none',
    border: 'none',
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  accountForm: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '400px'
    }
  },
  errorMessage: {
    color: 'firebrick'
  }
})

export default styles
