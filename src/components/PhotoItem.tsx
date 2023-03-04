import { Grid, ListItemButton, Tooltip } from "@mui/material";
import React from "react";
import { PhotoType } from "../model/album.model";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  item: PhotoType;
  provided;
  snapshot;
  removeImage: (item: PhotoType) => void;
  handleExpandedImage: (item: PhotoType) => void;
}

const PhotoItem: React.FC<Props> = ({
  item,
  removeImage,
  handleExpandedImage,
  provided,
  snapshot,
}) => {
  return (
    <Grid
      container
      ref={provided.innerRef}
      snapshot={snapshot}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Grid item>
        <Tooltip title={item["title"]} arrow>
          <ListItemButton
            onClick={() => {
              handleExpandedImage(item);
            }}
          >
            <img src={item.thumbnailUrl} alt="" />
          </ListItemButton>
        </Tooltip>
      </Grid>
      <Grid item>
        <ListItemButton
          onClick={() => {
            removeImage(item);
          }}
        >
          X
        </ListItemButton>
      </Grid>
    </Grid>
  );
};

export default PhotoItem;
