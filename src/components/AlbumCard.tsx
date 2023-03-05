import React from "react";
import { albumType, PhotoType, UserType } from "../model/album.model";
import {
  ListItemText,
  Collapse,
  List,
  ListItemButton,
  Grid,
  Button,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getPhotosByAlbumId, getUsersById } from "../DAL";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import "./Components.css";

import PhotoItem from "./PhotoItem";
interface Props {
  data: albumType;
}
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const AlbumCard: React.FC<Props> = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const [photos, setPhotos] = React.useState<PhotoType[]>([]);
  const [user, setUser] = React.useState<UserType>(null);
  const [imageOpen, setImageOpen] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<PhotoType>(null);

  const hendleCollapse = async () => {
    if (photos.length === 0 || !user) {
      Promise.all([
        getPhotosByAlbumId(data.id),
        getUsersById(data.userId),
      ]).then((result) => {
        setPhotos(result[0]);
        setUser(result[1]);
        setOpen(!open);
      });
    }
    setOpen(!open);
  };
  const handleExpandedImage = (item: PhotoType) => {
    if (imageOpen) {
      setImageOpen(false);
      return;
    }
    setSelectedItem(item);
    setImageOpen(true);
  };
  const removeImage = (item: PhotoType) => {
    const cPhotos = [...photos];
    const index = photos.findIndex((e) => {
      return e.id === item.id;
    });
    if (index !== -1) {
      cPhotos.splice(index, 1);
    }
    setPhotos(cPhotos);
  };

  const onDragEnd = (result) => {
    const newItems = Array.from(photos);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setPhotos(newItems);
  };

  return (
    <>
      <ListItemButton
        onClick={() => {
          hendleCollapse();
        }}
        style={{ backgroundColor: open ? "#e6dede" : "", marginBottom: "5px" }}
      >
        <ListItemText
          primary={<>album id: {data["id"]}</>}
          secondary={<span>{data["title"]}</span>}
        ></ListItemText>
        {open ? "▼" : "▲"}
      </ListItemButton>

      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        className="CollapseContainer"
      >
        {user && (
          <ListItemText
            primary={<>photos by: {user["name"]}</>}
            secondary={<>Email Address: {user.email}</>}
          ></ListItemText>
        )}
        <List component="div" disablePadding>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="DroppableContainer"
                >
                  {photos.map(
                    (item, index) =>
                      index < 12 && (
                        <Draggable
                          key={item.id}
                          draggableId={item.id + ""}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <PhotoItem
                              provided={provided}
                              snapshot={snapshot}
                              item={item}
                              removeImage={removeImage}
                              handleExpandedImage={handleExpandedImage}
                            />
                          )}
                        </Draggable>
                      )
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </List>

        {/* Dialog */}
        {selectedItem && (
          <Dialog open={imageOpen}>
            <Grid className="DialogContainer">
              <Grid>
                <Button
                  className="DialogCloseButton"
                  onClick={() => {
                    handleExpandedImage(null);
                  }}
                >
                  {"X"}
                </Button>
              </Grid>
              <Grid>
                <DialogContent>
                  {selectedItem.title}
                  <img src={selectedItem.url} alt="" />
                </DialogContent>
              </Grid>
            </Grid>
          </Dialog>
        )}
      </Collapse>
    </>
  );
};

export default React.memo(AlbumCard);
