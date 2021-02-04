import { Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { useEffect, useState } from "react";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Toast = ({ open, setOpen, status }) => {
  const [message, setMessage] = useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if(status === 'approved'){
      setMessage('You approved this track')
    }
    if(status === 'declined'){

      setMessage('You declined this track')
    }
    else if(!status){
      setMessage('Thank you for your submission!')
    }
  }, [status])
    
  return (
    <>
      <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Toast;