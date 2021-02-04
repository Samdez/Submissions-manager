import AddIcon from "@material-ui/icons/Add";
import { Box, Fab, Typography } from "@material-ui/core";

import { useContext, useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext";
const UploadImage = () => {
  const {image, setImage} = useContext(AuthContext);

  const handleChange = (e) => {
    if(e.target.files[0]){
      setImage(e.target.files[0]);
    }
  }
  useEffect(() => {
    console.log(image);
  }, [image])

  return (
    <label htmlFor="upload-photo">
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
          onChange={handleChange}
        />
        <Typography variant='h5'>Upload an artwork</Typography>
        <Fab color="primary" size="small" component="span" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </label>
  );
}

export default UploadImage;