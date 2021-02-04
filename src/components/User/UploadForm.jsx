import React, { useContext, useState } from 'react';
import {
  Box,
  Button, FormControl, FormControlLabel, Input, InputLabel, Radio, RadioGroup,
} from '@material-ui/core';
import { db } from '../../firebase/config';
import Toast from './Toast';
import UploadImage from './UploadImage';
import { AuthContext } from '../../context/AuthContext';
import { storage } from '../../firebase/config';
import { TheatersRounded } from '@material-ui/icons';

const UploadForm = () => {

  const [trackLink, setTrackLink] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [type, setType] = useState('');
  const [artistName, setArtistName] = useState('');
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const { image } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Upload track
    try {
      db.collection('tracks')
        .add({
          added: new Date(),
          artist: userEmail,
          link: trackLink,
          type: type,
          imageUrl: imageUrl
        })
    } catch (err) {
      console.log(err);
    }

    //Upload artwork
    console.log(image.name);
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      snapshot => { },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setImageUrl(url);
          })
      }
    )

    setUserEmail('');
    setTrackLink('');
    setArtistName('');
    setType('');
    setImageUrl('');
    setOpen(true);
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
        <h1>Lofirebase sumissions </h1>
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

            <RadioGroup row onChange={(e) => setType(e.target.value)}>
              <FormControlLabel value="release" control={<Radio />} label="Release" control={<Radio required={true} />} />
              <FormControlLabel value="playlist" control={<Radio />} label="Playlist" control={<Radio required={true} />} />
            </RadioGroup>

            <Button variant="contained" color="primary" type="submit">
              Submit
          </Button>
            <UploadImage />
          </Box>
        </form>
      </Box>
      <Toast open={open} setOpen={setOpen} />
    </Box>
  )
};

export default UploadForm;
