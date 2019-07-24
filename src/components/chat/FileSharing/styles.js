const styles = theme => ({
  main: {
    display: 'block', // Fix IE 11 issue.
  },
  paper: {
    position: 'relative',
    width: '100%'
  },
  input: {
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  errorText: {
    color: 'red',
    textAlign: 'center'
  },
  chatHeader: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#344195',
    fontSize: '14px',
    textAlign: 'center',
    color: 'white',
    padding: '10px',
    boxSizing: 'border-box'
  }
});

export default styles;