import { db } from '../../firebase/config';

import { Box, Button, makeStyles, Paper, TextField } from "@material-ui/core";
import { useEffect, useState } from 'react';

const useStyles = makeStyles(() => ({
  flex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center"
  },
  comment: {
    width: '30%',
    marginBottom: '1em'
  }
}));

const Comments = ({ id }) => {
  const classes = useStyles();
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('comments').orderBy('added').onSnapshot(snap => {
      const data = snap.docs.map(doc => doc.data())
      setCommentsList(data)
    });

    return () => unsubscribe() 
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      db.collection('comments')
        .add({
          added: new Date(),
          trackId: id,
          content: comment
        })
    } catch (err) {
      console.log(err);
    }
    setComment('');
  }

  return (
    <Box
      display="flex"
      flexDirection='column'
      justifyContent="center"
      alignItems='center'
    >
      <h1>Comments</h1>
    {
      commentsList
        .filter(comment => comment.trackId === id)
        .map(comment => {
        return <Paper 
        elevation={2}
        className={classes.comment}
        >{comment.content}
        </Paper>
      })
    }
      <form onSubmit={handleSubmit} className={classes.flex}>
        <TextField
          id="outlined-multiline-static"
          label="Comment"
          multiline
          rows={4}
          placeholder="leave a comment"
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button type='submit'>Post</Button>
      </form>
    </Box>
  );
}

export default Comments;