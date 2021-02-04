import { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Admin/Header";
import SubmissionsTable from "./Admin/SubmissionsTable";
import UploadForm from "./User/UploadForm";
import TrackPage from './Admin/TrackPage';
import { AuthContext } from "../context/AuthContext";
import Login from "./Admin/Login";
import Home from "./Admin/Home";

const Router = () => {
  const Auth = useContext(AuthContext);
  return (
    <BrowserRouter>
        <Route exact path='/' component={UploadForm} />
      {!Auth.isLoggedIn
        ? <Route path='/admin' component={Login} />
        :
        <>
          <Header />
          <Switch>
            <Route exact path='/admin'component={Home}/>
            <Route exact path='/admin/tracks' component={SubmissionsTable} />
            <Route path='/admin/tracks/:id' component={TrackPage} />
          </Switch>
        </>
      }
    </BrowserRouter>
  );
}

export default Router;