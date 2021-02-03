import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import db from '../../firebase/config';

const columns = [
  { id: 'artist', label: 'Artist', minWidth: 170 },
  { id: 'link', label: 'Link', minWidth: 100 },
  {
    id: 'type',
    label: 'Type',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function SubmissionsTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    db.collection('tracks').get().then((snapshot) => {
      let newTracks = [];
      snapshot.docs.forEach(doc => {
        newTracks.push(doc.data())
      })
      setTracks(newTracks)
    })
  }, [db]);
console.log(tracks);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
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
          <TableRow key={track.added?.seconds}>
            <TableCell component="th" scope="row">
              {track.artist}
            </TableCell>
            <TableCell align="right">{track.link}</TableCell>
            <TableCell align="right">{track.type}</TableCell>
            {/* <TableCell align="right">{row.carbs}</TableCell> */}
            {/* <TableCell align="right">{row.protein}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}