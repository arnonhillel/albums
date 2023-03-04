import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import AlbumCard from "./AlbumCard";
import { getAlbums } from "../DAL";
import { albumType } from "../model/album.model";

interface Props {}

const Album: React.FC<Props> = ({}) => {
  const [albums, setAlbums] = useState<albumType[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const albumsResult = await getAlbums();
    setAlbums(albumsResult);
  };

  return (
    <>
      <List
        sx={{ bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {albums.map((item, index) => (
          <AlbumCard data={item} key={index} />
        ))}
      </List>
    </>
  );
};

export default Album;
