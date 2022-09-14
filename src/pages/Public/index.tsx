//lib imports
import * as React from "react";
import { IconButton, TextField, Tooltip } from "@material-ui/core";
import Pagination from "@mui/material/Pagination";
import Box from '@mui/material/Box';
import { ImageList, ImageListItem } from '@mui/material';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { withRouter } from "react-router-dom";

//app specific imports
import EditImage from "components/atoms/EditImage";
import { guidGenerator } from "../../utils";

//type imports
import { Image } from '../../types';

//Icon imports
import EditIcon from '@mui/icons-material/edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { SearchOutlined } from "@mui/icons-material";

//style imports
import "../../styles/styles.scss";


const PublicPage = (props: any) => {
  const [page, setPage] = React.useState<Image[]>([]);
  const [paginationCount, setPaginationCount] = React.useState(1);
  const [pageItemsCount, setpPageItems] = React.useState(5);
  const [title, setTitle] = React.useState("");
  const [savePanelId, setSavePanelId] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [filterText, setFilterText] = React.useState("");
  const [images, setImages] = React.useState<Image[]>([]);

  const handleUploadClick = (event: any) => {
    if (!["image/jpeg", "image/png"].includes(event.target.files[0].type)) {
      alert("Please upload image of type png or jpeg formats only");
    }
    if (title === '') {
      alert("Please enter title for the image");
      return;
    }
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function () {
      const image = {
        img: reader.result,
        title: title,
        description: description,
        id: guidGenerator()
      };

      const imagesCopy = [...images];
      imagesCopy.push(image);

      setImages(imagesCopy);
      setPage(imagesCopy.slice((paginationCount - 1) * pageItemsCount, paginationCount * pageItemsCount));
      setTitle("");
      setDescription("");
      setFilterText("");
    }.bind(this);
  };

  const handleChangePage = (e: any, n: number) => {
    setPaginationCount(n);
    setPage(images.slice((n - 1) * pageItemsCount, n * pageItemsCount));
  };

  const handleSearch = (event: any) => {
    event.preventDefault();
    const filterdImages = images.filter((image: Image) => image.title.toLowerCase().match(filterText.toLowerCase()) !== null);
    setPage(filterdImages.slice(0, 5));
  };

  const deleteItem = (id: string) => {
    const filterdImages = images.filter((image: Image) => image.id !== id);
    setImages(filterdImages);
    setPage(filterdImages.slice((paginationCount - 1) * pageItemsCount, paginationCount * pageItemsCount));
  }

  const openEditPanel = (id: string) => {
    setSavePanelId(id);
  }

  const saveChanges = (savedImage: Image) => {
    const imagesCopy = [...images];
    imagesCopy.map((image: Image) => {
      if (savedImage.id === image.id) {
        image.title = savedImage.title;
        image.description = savedImage.description;
      }
    });
    setImages(imagesCopy);
    setPage(imagesCopy.slice((paginationCount - 1) * pageItemsCount, paginationCount * pageItemsCount));
    setSavePanelId("");
  }


  return (
    <div className="App">
      <form className="form">
        <h1>Upload an image</h1>
        <small>(png/jpg only)</small>
        <Box sx={{ width: 1 }}>
          <Box display="grid" gap={2}>
            <Box gridColumn="span 12">
              <TextField
                className="input"
                id="standard-title-input"
                label="Image title *"
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
            <Box gridColumn="span 12">
              <input
                accept="image/*"
                className="upload"
                id="contained-button-file"
                type="file"
                onChange={handleUploadClick}
              />
            </Box>
          </Box>
        </Box>
      </form>

      <Box className="image-gallery">
        <h1>Image gallery</h1>
        <form onSubmit={handleSearch}>
          <TextField
            className="input"
            id="standard-title-input"
            label="type search text and press enter"
            type="text"
            autoComplete="search"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            margin="normal"
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearch} >
                  <SearchOutlined />
                </IconButton>
              ),
            }}

          />
        </form>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {page.map((item) => (
            <ImageListItem key={item.img}>
              {savePanelId !== item.id && <img
                src={`${item.img}`}
                alt={item.title}
                loading="lazy" />}
              {savePanelId !== item.id && <ImageListItemBar
                title={item.title}
                subtitle={<span>Description: {item.description}</span>}
                position="below"
              />}
              {savePanelId === item.id && <EditImage {...item} saveChanges={saveChanges} />}
              {savePanelId !== item.id && <div className="actions">
                <Tooltip title="Edit">
                  <EditIcon color="primary" fontSize="small" onClick={() => openEditPanel(item.id)} />
                </Tooltip>
                <Tooltip title="Delete">
                  <DeleteIcon fontSize="small" sx={{ color: 'red' }} onClick={() => deleteItem(item.id)} />
                </Tooltip>
              </div>}
            </ImageListItem>
          ))}
        </ImageList>

        <Pagination
          count={Math.ceil(images.length / 5)}
          variant="outlined"
          style={{
            alignItems: "center",
            marginLeft: "40%",
            marginBottom: "10px"
          }}
          color="primary"
          onChange={(e, n) => handleChangePage(e, n)}
        />
      </Box>
    </div>
  );
};

export default withRouter(PublicPage);


