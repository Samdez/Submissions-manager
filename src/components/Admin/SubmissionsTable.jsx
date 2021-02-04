import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { db } from '../../firebase/config';
import { useHistory } from 'react-router-dom';
import { Box, Checkbox, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  pointer: {
    cursor: 'pointer'
  },
  container: {
    maxWidth: '80%',
  }
});

export default function SubmissionsTable() {
  const classes = useStyles();
  const [tracks, setTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [releaseFilter, setReleaseFilter] = useState(false);
  const [playlistFilter, setPlaylistFilter] = useState(false);
  const history = useHistory();

  useEffect(() => {
    db.collection('tracks').get().then((snapshot) => {
      let newTracks = [];
      snapshot.docs.forEach(doc => {
        newTracks.push({ data: doc.data(), id: doc.id })
      })
      setTracks(newTracks)
      setFilteredTracks(newTracks)
    })
  }, []);

  useEffect(() => {
    if((playlistFilter && releaseFilter) || (!playlistFilter && !releaseFilter)){
      setFilteredTracks(tracks)
    }
    else if(playlistFilter){
      const filteredTracks = tracks.filter(track => track.data.type === 'playlist')
      setFilteredTracks(filteredTracks)
    }
    else if(releaseFilter){
      const filteredTracks = tracks.filter(track => track.data.type === 'release')
      setFilteredTracks(filteredTracks)
    }
  }, [playlistFilter, releaseFilter])

  return (
    <>
    <Box
    display='flex'
    alignItems='center'
    justifyContent='space-around'
    width='30%'
    margin='auto'
    >
      <Checkbox 
      color='primary'
      onChange={(e) => setReleaseFilter(e.target.checked)}
      checked={releaseFilter}
      />
      <Typography>Releases</Typography>
      <Checkbox 
      color='primary'
      onChange={(e) => setPlaylistFilter(e.target.checked)}
      checked={playlistFilter}
      />
      <Typography>Playlist</Typography>
    </Box>
    <Box display='flex' justifyContent='center' mt={5}>
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Artist</TableCell>
            <TableCell align="right">Link</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTracks.map((track) => (
            <TableRow key={track.id} onClick={() => history.push(`/admin/tracks/${track.id}`)} className={classes.pointer}>
              <TableCell component="th" scope="row">
                {track.data.artist}
              </TableCell>
              <TableCell align="right">{track.data.link}</TableCell>
              <TableCell align="right">{track.data.type}</TableCell>
              <TableCell align="right">{track.data.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </>
  );
}