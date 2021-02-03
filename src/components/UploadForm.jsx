import React, { useState } from 'react';
import {
  Box,
  Button, FormControl, Input, InputLabel,
} from '@material-ui/core';

const UploadForm = () => {

  const [trackLink, setTrackLink] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(trackLink);
    setUserEmail('');
    setTrackLink(''); 
  }

  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
    >
      <Box
        height="100%"
        width="50%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" onChange={(e) => setUserEmail(e.target.value)} value={userEmail}/>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="my-input">Track link</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" onChange={(e) => setTrackLink(e.target.value)} value={trackLink}/>
          </FormControl>

          <Button variant="contained" color="primary" type="submit">
            Submit
      </Button>
        </form>
      </Box>
    </Box>
  )
};

export default UploadForm;
