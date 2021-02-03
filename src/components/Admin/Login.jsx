import { Box, Button, FormControl, Input, InputLabel, makeStyles } from "@material-ui/core";
import { auth } from "../../firebase/config";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";


const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '50%',
    padding: '2em'
  }
});

const Login = () => {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const classes = useStyles();
  const Auth = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then(res => {
        Auth.setIsLoggedIn(true)
      })
      .catch(error => {
        console.error("Error signing in with password and email", error);
    });
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
        <form
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="my-input">Email</InputLabel>
            <Input type='email' aria-describedby="my-helper-text" onChange={(e) => setUserEmail(e.target.value)} value={userEmail} />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="my-input">Password</InputLabel>
            <Input type='password' aria-describedby="my-helper-text" onChange={(e) => setUserPassword(e.target.value)} value={userPassword} />
          </FormControl>

          <Button type="submit" color="primary" className="form__custom-button">
            Log in
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default Login;