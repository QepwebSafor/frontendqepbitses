import axios from "axios";
//import { getToken } from "./tokenUtils";

const SERVER_URL = "http://localhost:5000";
axios.defaults.baseURL = SERVER_URL;
//Comments
export const getComments = payload => axios.get(`/api/comments`, payload);
export const createComment = payload => axios.post(`/api/comments`, payload);
export const getComment = commentId => axios.get(`/api/comments/${commentId}`);
export const updateComment = (payload, commentId) => axios.put(`/api/comments/${commentId}`, payload);
export const deleteComment = commentId => axios.delete(`/api/comments/${commentId}`);
//Images
export const getImages = payload => axios.get(`/api/images`, payload);
export const createImage = payload => axios.post(`/api/images`, payload);
export const getImage = (ImageId, payload) => axios.get(`/api/images/${ImageId}`);
export const updateImage = (ImageId, payload) => axios.put(`/api/images/${ImageId}`, payload);
export const deleteImage = ImageId => axios.delete(`/api/images/${ImageId}`);
