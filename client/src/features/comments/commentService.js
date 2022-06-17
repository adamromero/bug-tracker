import axios from "axios";

const getComments = async (id) => {
   const response = await axios.get(`/api/comment/${id}`);
   return response.data;
};

const createComment = async (comment) => {
   const response = await axios.post("/api/comment", comment);
   return response.data;
};

const updateComment = async (comment) => {
   const response = await axios.put(`/api/comment/${comment.id}`, comment);
   return response.data;
};

const deleteComment = async (id) => {
   const response = await axios.delete(`/api/comment/${id}`);
   return response.data;
};

const commentService = {
   getComments,
   createComment,
   updateComment,
   deleteComment,
};

export default commentService;
