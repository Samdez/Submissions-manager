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
import { Box } from '@material-ui/core';

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
  const history = useHistory();

  useEffect(() => {
    db.collection('tracks').get().then((snapshot) => {
      let newTracks = [];
      snapshot.docs.forEach(doc => {
        newTracks.push({ data: doc.data(), id: doc.id })
      })
      setTracks(newTracks)
    })
  }, [db]);

  return (
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
          {tracks.map((track) => (
            <TableRow key={track.id} onClick={() => history.push(`/admin/tracks/${track.id}`)} className={classes.pointer}>
              <TableCell component="th" scope="row">
                {track.data.artist}
              </TableCell>
              <TableCell align="right">{track.data.link}</TableCell>
              <TableCell align="right">{track.data.type}</TableCell>
              <TableCell align="right">{track.data.status}</TableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}