import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Admin/Header";
import SubmissionsTable from "./Admin/SubmissionsTable";
import UploadForm from "./User/UploadForm";
import TrackPage from './Admin/TrackPage';
import { TracksContext } from "../context/TracksContext";

const Router = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  return (
    <BrowserRouter>
        {!isAdmin
          ? <Route exact path='/' component={UploadForm} />
          :
          <>
            <Header />
            <Switch>
              <Route exact path='/' component={SubmissionsTable} />
              <Route path='/:id' component={TrackPage} />
            </Switch>
          </>
        }
    </BrowserRouter>
  );
}

export default Router;