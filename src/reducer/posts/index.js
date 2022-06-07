const initialState = {
  posts: [],
  comments: [],
};

const postsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_POSTS":
      return {
        ...state,
        posts: payload,
      };
    case "ADD_POSTS":
      return {
        ...state,
        posts: [payload, ...state.posts],
      };
    case "UPDATE_POSTS":
      return {
        ...state,
        posts: state.posts.map((element) => {
          if (element.id === payload.id) {
            return payload;
          }
          return element;
        }),
      };
    case "DELETE_POSTS":
      return {
        ...state,
        posts: state.posts.filter((element) => {
          return element.id !== payload;
        }),
      };
    case "SET_COMMENTS":
      return {
        ...state,
        comments: payload,
      };
    default:
      return state;
  }
};

export default postsReducer;

export const setPosts = (posts) => {
  return { type: "SET_POSTS", payload: posts };
};

export const addPosts = (newPosts) => {
  return { type: "ADD_POSTS", payload: newPosts };
};

export const updatePosts = (updatedPosts) => {
  return { type: "UPDATE_POSTS", payload: updatedPosts };
};

export const deletePosts = (id) => {
  return { type: "DELETE_POSTS", payload: id };
};

export const setComments = (comments) => {
  return { type: "SET_COMMENTS", payload: comments };
};
