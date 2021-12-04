import React, { useState, useEffect } from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface State extends SnackbarOrigin {
  open: boolean;
}

const  SnackBarAlert : React.FC<any> = ({ initialState, message }) => {
  const [state, setState] = useState<State>({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  useEffect(() => {
    if(initialState) {
        setState({...state, open: initialState });
        setTimeout(() => {
          setState({...state, open: false });
        }, 1000);
    }
    // eslint-disable-next-line
  }, [initialState]);

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <div>
    <Snackbar 
        anchorOrigin={{ vertical, horizontal }} 
        open={open} 
        autoHideDuration={1500} 
        onClose={handleClose}
    >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SnackBarAlert