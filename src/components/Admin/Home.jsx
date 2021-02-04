import { Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";

const Home = () => {

  const [ tracks, setTracks] = useState([]);
  const [ pending, setPending] = useState(0);

  useEffect(() => {
    db.collection('tracks').get().then((snapshot) => {
      let newTracks = [];
      snapshot.docs.forEach(doc => {
        newTracks.push({ data: doc.data(), id: doc.id })
      })
      setTracks(newTracks)
    });
  }, [db]);

  useEffect(() => {
    console.log(tracks);
    tracks.forEach(track => {
      !track.data.status && setPending(pending => pending + 1)
    })
    return () => setPending(0) 
  }, [tracks])
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