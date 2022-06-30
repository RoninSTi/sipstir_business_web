import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
 container: ({ size }) => ({
  height: `${size}px`,
  width: `${size}px`,
 }),
 image: {
  background: ({ url }) => `url(${url}) 50% 50% no-repeat`,
  minHeight: '100%',
 },
});

export default useStyles;
