import { useState } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Header from "./Admin/Header";
import SubmissionsTable from "./Admin/SubmissionsTable";
import UploadForm from "./User/UploadForm";

const Router = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  return (
    <BrowserRouter>
      {!isAdmin
        ? <UploadForm />
        : 
        <>
        <Header />
        <Switch>
          <SubmissionsTable />
        </Switch>
        </>
  }
    </BrowserRouter>
  );
}

export default Router;