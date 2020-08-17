import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  loginContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  logo: {
    height: 69,
    marginRight: 20,
    width: 84
  },
  logoContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 60
  },
  subtitle: {
    color: 'white',
    fontWeight: '500',
    fontSize: 28
  },
  title: {
    color: 'white',
    fontSize: 36,
    fontWeight: '700'
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column'
  }
})

export default useStyles
