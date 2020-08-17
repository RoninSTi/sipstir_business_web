import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  blockContainer: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    minHeight: '100%'
  },
  box: {
    padding: 0
  },
  image: {
    height: 200,
    width: 200
  },
  info: {
    paddingBottom: 30,
    paddingTop: 30
  },
  infoSubtitle: {
    color: '#A0A0A0',
    fontWeight: '500',
    fontSize: 16
  },
  infoTitle: {
    color: '#484040',
    fontWeight: '700',
    fontSize: 24
  },
  infoVicinity: {
    color: '#484040',
    fontSize: 16
  }
})

export default useStyles
