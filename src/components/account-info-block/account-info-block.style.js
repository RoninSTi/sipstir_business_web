import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
 button: {
  color: '#E7493E !important',
  fontWeight: '500',
  fontSize: 18,
  textDecoration: 'none !important',
 },
 container: {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  maxHeight: '200px',
  paddingTop: '20px',
  paddingBottom: '20px',
 },
 subtitle: {
  color: '#A0A0A0',
  fontWeight: '500',
  fontSize: 16,
 },
 title: {
  color: '#484040',
  fontWeight: '700',
  fontSize: 24,
 },
});

export default useStyles;
