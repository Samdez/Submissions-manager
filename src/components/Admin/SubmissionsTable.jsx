import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { db, auth } from '../../firebase/config';
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
  const [votes, setVotes] = useState([]);
  const history = useHistory();
  const userId = auth.currentUser.uid;


  useEffect(() => {
   db.collection('tracks').orderBy('added', 'desc').get().then((snapshot) => {
      let newTracks = [];
      snapshot.docs.forEach(doc => {
        newTracks.push({ data: doc.data(), id: doc.id })
      })
      setTracks(newTracks)
      setFilteredTracks(newTracks)
    })

    db.collectionGroup('votes')
    .get()
    .then(snapshot => {
      let newVotes = [];
      snapshot.docs.forEach(doc => {
        newVotes.push(doc.data())
      })
      setVotes(newVotes)
      })
  }, []);

  useEffect(()=> {
    console.log(votes);
  }, [votes])

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
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Votes</TableCell>
            <TableCell align="right">Your vote</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTracks.map((track) => (
            <TableRow key={track.id} onClick={() => history.push(`/admin/tracks/${track.id}`)} className={classes.pointer}>
              <TableCell component="th" scope="row">
                {track.data.artist}
              </TableCell>
              <TableCell align="right">{track.data.type}</TableCell>
              <TableCell align="right">
                {votes
                  .filter(vote => vote.user !== userId)
                  .filter(vote => vote.trackId === track.id)
                  .map(vote => {
                    return vote.status === 'approved'
                    ? <ThumbUpIcon color='primary'/>
                    : <ThumbDownIcon color='secondary'/>
                  })
                  }
              </TableCell>
              <TableCell align="right">{votes
                  .filter(vote => vote.user === userId)
                  .filter(vote => vote.trackId === track.id)
                  .map(vote => {
                    return vote.status === 'approved'
                    ? <ThumbUpIcon color='primary'/>
                    : <ThumbDownIcon color='secondary'/>
                  })
                  }
                  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </>
  );
}