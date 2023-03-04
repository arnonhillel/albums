import axios, { AxiosInstance } from "axios";
import { IDeleteParams, ISinglePath, ITwoPaths } from '../constants/types';
import { albumType, PhotoType, UserType } from "../model/album.model";

const enum EUrl {
    baseURL = "https://jsonplaceholder.typicode.com",

}



export const getAlbums = ():Promise<albumType[]> => {
    return fetch(`${EUrl.baseURL}/albums`)
      .then((response) =>  response.json())
      .then((json) => {
        return json
      } );
};
export const getPhotosByAlbumId = (albumId: number):Promise<PhotoType[]> => {
    return fetch(`${EUrl.baseURL}/photos?albumId=${albumId}`)
      .then((response) =>  response.json())
      .then((json) => {
        return json
      } );
};
export const getUsersById = (id: number):Promise<UserType> => {
    return fetch(`${EUrl.baseURL}/users/${id}`)
      .then((response) =>  response.json())
      .then((json) => {
        return json
      } );
};






