import blogService from "../services/blogs";

const byLikes = (a1, a2) => a2.likes - a1.likes;

export const allBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "ALL",
      data: blogs,
    });
  };
};

export const createNewBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch({
      type: "NEW_BLOG",
      data: newBlog,
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const data = await blogService.update(blog);
    dispatch({
      type: "LIKE",
      data,
    });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch({
      type: "DELETE",
      data: id,
    });
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case "ALL":
    return action.data;
  case "NEW_BLOG":
    return [...state, action.data];
  case "LIKE":
    return state.map((a) => (a.id === action.data.id ? action.data : a)).sort(byLikes);
  case "DELETE":
    return state.filter((b) => b.id !== action.data);
  default:
    return state;
  }
};

export default blogReducer;
