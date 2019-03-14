import axios from 'axios';

const getArticleList = (params) => { return axios.get('/blog/getArticleList', { params }) };
const getArticle = (params) => { return axios.get('/blog/getArticle', { params }) };
const getLabel = () => { return axios.get('/management/getLabel') };
const getTimeLine = () => { return axios.get('/blog/getTimeLine') };
const captcha = () => { return axios.get('/blog/captcha') };
const register = (params) => { return axios.post('/blog/register', params) };
const login = (params) => { return axios.post('/blog/login', params) };
const saveImage = (params) => {
  return axios.post('/blog/saveImage', params, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
};
const editUserInfo = (params) => { return axios.post('/blog/editUserInfo', params) };
const comment = (params) => { return axios.post('/blog/comment', params) };
const getCommentList = (params) => { return axios.get('/blog/getCommentList', { params }) };
const replyComment = (params) => { return axios.post('/blog/replyComment', params) };

export default {
  getArticleList,
  getLabel,
  getArticle,
  getTimeLine,
  captcha,
  register,
  login,
  saveImage,
  editUserInfo,
  comment,
  getCommentList,
  replyComment
};