import { AppBar, Button, makeStyles, Toolbar, Typography } from "@material-ui/core";
import AlbumSharpIcon from '@material-ui/icons/AlbumSharp';
import { useHistory } from "react-router-dom";


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
  return (
    <AppBar position="static">
      <Toolbar>
          <Button onClick={() => history.push('/admin/tracks')}>
            <AlbumSharpIcon />
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
