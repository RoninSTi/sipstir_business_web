import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  brandText: {
    display: 'flex',
    flexDirection: 'column'
  },
  logoutButton: {
    color: 'white !important',
    textDecoration: 'none !important',

    '&:hover': {
      backgroundColor: '#FFC5C1 !important',
      color: 'white !important'
    }
  }
})

export default useStyles
