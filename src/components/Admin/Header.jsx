import { AppBar, Button, makeStyles, Toolbar, Typography } from "@material-ui/core";
import AlbumSharpIcon from '@material-ui/icons/AlbumSharp';
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


const useStyles = makeStyles((theme) => ({
  nav: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '60px',
    cursor: 'pointer'
  }
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const Auth = useContext(AuthContext)
  return (
    <AppBar position="static">
      <Toolbar>
          <Button onClick={() => history.push('/admin/tracks')}>
            <AlbumSharpIcon />
          </Button>
          <Button onClick={() => {
            Auth.setIsLoggedIn(false)
            history.push('/admin')
            }}>
            Log out
          </Button>
          <Typography variant="h6" className={classes.nav} onClick={() => history.push('/admin/tracks')}>
            Submissions
        </Typography>
          <Typography variant="h6" className={classes.nav}>
            Artists
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
