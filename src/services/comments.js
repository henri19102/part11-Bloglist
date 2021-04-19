import axios from "axios";

const baseUrl = "/api/comments";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const newComment = async (comment) => {
  const response = await axios.post(baseUrl, comment);
  return response.data;
};

export default { getAll, newComment };
