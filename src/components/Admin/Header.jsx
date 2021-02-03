import { AppBar, Button, Grid, makeStyles, Toolbar, Typography } from "@material-ui/core";
import AlbumSharpIcon from '@material-ui/icons/AlbumSharp';


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
  return (
    <AppBar position="static">
      <Toolbar>
          <Button>
            <AlbumSharpIcon />
          </Button>
          <Typography variant="h6" className={classes.nav}>
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
