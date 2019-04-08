import axios from 'axios';

const getArticleList = (params) => { return axios.get('/blog-serve/blog/getArticleList', { params }) };
const getArticle = (params) => { return axios.get('/blog-serve/blog/getArticle', { params }) };
const getLabel = () => { return axios.get('/blog-serve/management/getLabel') };
const getTimeLine = () => { return axios.get('/blog-serve/blog/getTimeLine') };
const captcha = () => { return axios.get('/blog-serve/blog/captcha') };
const register = (params) => { return axios.post('/blog-serve/blog/register', params) };
const login = (params) => { return axios.post('/blog-serve/blog/login', params) };
const saveImage = (params) => {
  return axios.post('/blog-serve/blog/saveImage', params, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
};
const editUserInfo = (params) => { return axios.post('/blog-serve/blog/editUserInfo', params) };
const comment = (params) => { return axios.post('/blog-serve/blog/comment', params) };
const getCommentList = (params) => { return axios.get('/blog-serve/blog/getCommentList', { params }) };
const replyComment = (params) => { return axios.post('/blog-serve/blog/replyComment', params) };

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