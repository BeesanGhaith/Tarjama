import "./Posts.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPosts,
  addPosts,
  updatePosts,
  deletePosts,
  setComments,
} from "../../reducer/posts/index";
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";

function Posts() {
  const [show, setShow] = useState(false); // to view the add div
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [update, setUpdate] = useState(false); // to view the update div
  const [titlePut, setTitlePut] = useState("");
  const [bodyPut, setBodyPut] = useState("");
  const [deletePost, setDeletePost] = useState(false); // to view the delete div
  const [idDelete, setIdDelete] = useState(); // to find out which post needs to be deleted by ID
  const [idUpdate, setIdUpdate] = useState(); // to find out which post needs to be edited by ID

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      user: state.loginReducer.user,
      posts: state.postsReducer.posts,
      comments: state.postsReducer.comments,
    };
  });

  const getPosts = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        dispatch(setPosts(response.data));
      })
      .catch((error) => {});
  };

  const getComment = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        dispatch(setComments(response.data));
      })
      .catch((error) => {});
  };

  const addPost = async () => {
    await axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        userId: state.user.id,
        title,
        body,
      })
      .then((response) => {
        dispatch(addPosts(response.data));
      });
  };

  const updatePostById = async (id) => {
    await axios
      .patch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        title: titlePut,
        body: bodyPut,
      })
      .then((response) => {
        dispatch(updatePosts(response.data));
      })
      .catch((error) => {});
  };

  const deletePostById = async (id) => {
    await axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        dispatch(deletePosts(id));
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getPosts();
    getComment();
  }, []);

  return (
    <>
      <div className="div-click-here">
        <span
          className="click"
          onClick={() => {
            setShow(true);
          }}
        >
          Click here
        </span>
        <span> if you want to add a new post ..</span>
      </div>
      {show && show ? (
        <div className="div-add-post">
          <p>Title:</p>
          <input
            placeholder="What are you thinking about?."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <p>Body:</p>
          <input
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
          <br />
          <button
            className="btn-add-post"
            onClick={() => {
              addPost();
              setShow(false);
            }}
          >
            Submite
          </button>
        </div>
      ) : (
        <></>
      )}

      <div className="div-posts">
        {state.posts &&
          state.posts.map((post) => {
            if (post.userId == state.user.id) {
              return (
                <>
                  <div className="card">
                    <div className="div-name-edit">
                      <p>{state.user.name}</p>
                      <AiTwotoneEdit
                        className="edit-icon"
                        onClick={() => {
                          setUpdate(true);
                          setTitlePut(post.title);
                          setBodyPut(post.body);
                          setIdUpdate(post.id);
                          setDeletePost(false);
                        }}
                      />
                      <AiTwotoneDelete
                        className="delete-icon"
                        onClick={() => {
                          setDeletePost(true);
                          setIdDelete(post.id);
                          setUpdate(false);
                        }}
                      />
                    </div>

                    {deletePost && post.id == idDelete ? (
                      <>
                        <div className="div-delete">
                          <p>Are you sure?</p>
                          <button
                            className="btn-yes"
                            onClick={() => {
                              deletePostById(post.id);
                              setDeletePost(false);
                            }}
                          >
                            Yes
                          </button>
                          <button
                            className="btn-no"
                            onClick={() => {
                              setDeletePost(false);
                            }}
                          >
                            No
                          </button>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {update && post.id == idUpdate ? (
                      <>
                        <div className="card-title-body">
                          <p className="para-put">Title: </p>
                          <input
                            defaultValue={post.title}
                            onChange={(e) => {
                              setTitlePut(e.target.value);
                            }}
                          />
                          <p className="para-put">Body: </p>
                          <input
                            defaultValue={post.body}
                            onChange={(e) => {
                              setBodyPut(e.target.value);
                            }}
                          />
                          <br />
                          <button
                            className="btn-edit"
                            onClick={() => {
                              updatePostById(post.id);
                              setUpdate(false);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="card-title-body">
                          <p className="para">Title: </p>
                          <p>{post.title}</p>
                          <p className="para">Body: </p>
                          <p>{post.body}</p>
                        </div>
                      </>
                    )}

                    <p className="comments">COMMENTS:</p>
                    {state.comments ? (
                      state.comments.map((comment) => {
                        if (post.id === comment.postId) {
                          return (
                            <>
                              <div className="card-title-body">
                                <p className="para">Name:</p>
                                <p>{comment.name}</p>
                                <p className="para">Email:</p>
                                <p>{comment.email}</p>
                                <p className="para">Body:</p>
                                <p>{comment.body}</p>
                              </div>
                            </>
                          );
                        }
                      })
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div className="card">
                    <div className="card-title-body">
                      <p className="para">Title: </p>
                      <p>{post.title}</p>
                      <p className="para">Body: </p>
                      <p>{post.body}</p>
                    </div>
                    <p className="comments">COMMENTS:</p>
                    {state.comments ? (
                      state.comments.map((comment) => {
                        if (post.id === comment.postId) {
                          return (
                            <>
                              <div className="card-title-body">
                                <p className="para">Name:</p>
                                <p>{comment.name}</p>
                                <p className="para">Email:</p>
                                <p>{comment.email}</p>
                                <p className="para">Body:</p>
                                <p>{comment.body}</p>
                              </div>
                            </>
                          );
                        }
                      })
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              );
            }
          })}
      </div>
    </>
  );
}

export default Posts;
