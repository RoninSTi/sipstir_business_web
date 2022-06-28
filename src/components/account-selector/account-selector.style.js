import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
 button: {
  backgroundColor: 'rgba(255, 255, 255, .20)',
  borderWidth: 0,
  color: 'white',

  '&:hover': {
   color: '#5177FF',
  },
 },
 dropdownItem: {
  backgroundColor: 'transparent',
  borderWidth: 0,
 },
});

export default useStyles;
