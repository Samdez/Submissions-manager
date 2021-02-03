import React, { useState } from 'react';
import {
  Box,
  Button, FormControl, FormControlLabel, Input, InputLabel, Radio, RadioGroup,
} from '@material-ui/core';
import db from '../firebase/config';
import Toast from './Toast';

const UploadForm = () => {

  const [trackLink, setTrackLink] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [type, setType] = useState('');
  const [artistName, setArtistName] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    try{
      db.collection('tracks')
      .add({
        added: new Date(),
        artist: userEmail,
        link: trackLink,
        type: type
      })
    }catch(err){
      console.log(err);
    }

    setUserEmail('');
    setTrackLink('');
    setArtistName('');
    setType('');
    setOpen(true);
  }

  const handleRadioChange = (e) => {
    setType(e.target.value)
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
            <InputLabel htmlFor="my-input">Artist name</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" onChange={(e) => setArtistName(e.target.value)} value={artistName} />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="my-input">Email address *</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" onChange={(e) => setUserEmail(e.target.value)} value={userEmail} required />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="my-input">Track link *</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" onChange={(e) => setTrackLink(e.target.value)} value={trackLink} />
          </FormControl>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center">

            <FormControl component="fieldset">
              <RadioGroup aria-label="gender" name="gender1" onChange={handleRadioChange} row required>
                <FormControlLabel value="release" control={<Radio />} label="Release" />
                <FormControlLabel value="playlist" control={<Radio />} label="Playlist" />
              </RadioGroup>
            </FormControl>

            <Button variant="contained" color="primary" type="submit">
              Submit
          </Button>
          </Box>
        </form>
      </Box>
      <Toast open={open} setOpen={setOpen}/>
    </Box>
  )
};

export default UploadForm;
