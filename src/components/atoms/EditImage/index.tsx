//Lib imports
import * as React from "react";
import Box from '@mui/material/Box';
import { Button, TextField } from '@material-ui/core';

//app specific imports
import { Image } from '../../../types';

interface EditImageProps extends Image {
  saveChanges: (data: Image) => void
}

const Component = (props: EditImageProps) => {
  const [title, setTitle] = React.useState(props.title);
  const [description, setDescription] = React.useState(props.description);

  const saveChanges = () => {
    const data = { ...props };
    data.title = title;
    data.description = description;
    props.saveChanges(data);
  };

  return (
    <Box display="grid" gap={2}>
      <Box gridColumn="span 12">
        <TextField
          className="input"
          id="standard-title-input"
          label="Image title"
          type="text"
          autoComplete="current-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>
      <Box gridColumn="span 12">
        <TextField
          className="input"
          id="standard-description-input"
          label="Image description"
          type="text"
          autoComplete="current-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>
      <Button color="primary" onClick={saveChanges}>Save</Button>
    </Box>
  );

}

export default Component;
