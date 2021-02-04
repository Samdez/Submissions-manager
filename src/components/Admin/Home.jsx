import { Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import { db, auth } from "../../firebase/config";

const Home = () => {

  const [ tracks, setTracks] = useState([]);
  const [ pending, setPending] = useState(0);
  const [votes, setVotes] = useState([]);
  const [userVotes, setUserVotes] = useState(0);
  const userId = auth.currentUser.uid;


  useEffect(() => {
    db.collection('tracks').orderBy('added', 'desc').get().then((snapshot) => {
      let newTracks = [];
      snapshot.docs.forEach(doc => {
        newTracks.push({ data: doc.data(), id: doc.id })
      })
      setTracks(newTracks)
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

  useEffect(() => {
    const tracksVoted = []
    votes.forEach(vote => {
      if(vote.user === userId){
        tracksVoted.push(vote)
      }
    })
    console.log(tracks,tracksVoted, userVotes);
    setPending(tracks.length - tracksVoted.length)
  }, [votes])



  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      flexDirection='column'
      justifyContent="center"
      alignItems='center'
    >
      <h1>Yo bro!</h1>
      <h3>You have {pending} pending track(s) </h3>
    </Box>
  );
}

export default Home;