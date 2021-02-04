import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box, CardMedia } from '@material-ui/core';
import { db, auth } from '../../firebase/config';
import { useParams } from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import firebase from 'firebase/app';
import Comments from './Comments';
import Toast from '../User/Toast';

const useStyles = makeStyles({
  root: {
    maxWidth: '80%',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  link: {
    textDecoration: 'none',
    color: "inherit"
  },
  media: {
    height: '30vh',
    // width: '30vw',
    objectFit: 'contain'
  }
});

export default function Trackpage() {
  const classes = useStyles();
  const [track, setTrack] = useState({});
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [vote, setVote] = useState([]);
  const userId = auth.currentUser.uid;

  useEffect(() => {
    db.collection('tracks')
      .where(firebase.firestore.FieldPath.documentId(), '==', id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          setTrack(doc.data())
        })
      })
  }, []);

  useEffect(() => {
    db.collectionGroup('votes').where('trackId', '==', id).where('user', '==', userId)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          setVote(doc.data())
        })
      })
  }, [status])

  const handleApprove = () => {
    const docRef = db.collection('tracks').doc(id);
    docRef.collection('votes').doc(userId).set({
      status: 'approved',
      user: userId,
      trackId: id
    })
    setStatus('approved')
    setOpen(true)
  }

  useEffect(() => {
    console.log(track);
  }, [track])

  const handleRefuse = () => {
    const docRef = db.collection('tracks').doc(id);
    docRef.collection('votes').doc(userId).set({
      status: 'declined',
      user: userId,
      trackId: id
    })
    setStatus('declined')
    setOpen(true)
  }

  return (
    <>
      <Box
        height="50vh"
        width="100vw"
        display="flex"
        justifyContent="center"
        alignItems='center'
        marginTop='5vh'
      >
        <Card className={classes.root}>
          <CardActionArea>
            <a href={track.link} target="_blank" rel='noreferrer' className={classes.link}>
              {track.imageUrl &&
                <CardMedia
                  className={classes.media}
                  image={track.imageUrl}
                  title="artwork"
                />
              }
              <CardContent>
                <Typography gutterBottom variant="h3" component="h3">
                  {track.artist}
                </Typography>
                <Typography variant="h3" color="textSecondary" component="h3">
                  {track.link}
                </Typography>
                <Typography variant="h5" color="textSecondary" component="p">
                  {track.type}
                </Typography>
              </CardContent>
            </a>
          </CardActionArea>
          <CardActions
            className={classes.buttons}
          >
            <Button size="small" color='primary' onClick={handleApprove}>
              <ThumbUpIcon />
              {vote.status === 'approved' && <CheckCircleIcon />}
            </Button>
            <Button size="small" color='primary' onClick={handleRefuse}>
              <ThumbDownIcon />
              {vote.status === 'declined' && <CheckCircleIcon />}
            </Button>
          </CardActions>
        </Card>
      </Box>
      <Comments id={id} />
      <Toast open={open} setOpen={setOpen} status={status} />
    </>
  );
}