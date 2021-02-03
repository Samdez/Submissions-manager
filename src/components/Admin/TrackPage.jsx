import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import db from '../../firebase/config';
import { useHistory, useParams } from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import firebase from 'firebase/app';

const useStyles = makeStyles({
  root: {
    maxWidth: '80%',
  },
  box: {
    height: '100vh',
    width: '100%'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around'
  }
});

export default function Trackpage() {
  const classes = useStyles();
  const [track, setTrack] = useState({});
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    console.log(id);
    db.collection('tracks').where(firebase.firestore.FieldPath.documentId(), '==', id).get().then((querySnapshot) => {
     querySnapshot.forEach(doc => {
       setTrack(doc.data())
     })
    })
  }, []);

  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      justifyContent="center"
      alignItems='center'
    >
      <Card className={classes.root} onClick={() => history.push(track.link)}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h1" component="h1">
              {track.artist}
          </Typography>
            <Typography variant="h3" color="textSecondary" component="h3">
              {track.link}
          </Typography>
          <Typography variant="h5" color="textSecondary" component="p">
              {track.type}
          </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
        className={classes.buttons}
        >
          <Button size="small" color="primary">
            <ThumbUpIcon />
        </Button>
          <Button size="small" color="primary">
            <ThumbDownIcon />
        </Button>
        </CardActions>
      </Card>
    </Box>
  );
}