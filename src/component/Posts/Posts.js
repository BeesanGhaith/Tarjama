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
import { AiTwotoneEdit } from "react-icons/ai";

function Posts() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [update, setUpdate] = useState(false);

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
        console.log(response.data);
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
        console.log(response);
        dispatch(addPosts(response.data));
      });
  };

  // const getPostsById = async (id) => {
  //   await axios
  //     .get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {});
  // };

  useEffect(() => {
    // getPostsById(state.user.id);
    getPosts();
    getComment();
  }, [state.user]);

  return (
    <>
      <div>
        <p
          onClick={() => {
            setShow(true);
          }}
        >
          Click here if you want to add a new post ..
        </p>
      </div>
      {show && show ? (
        <div>
          <p>Title</p>
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <p>Body</p>
          <input
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
          <button
            onClick={() => {
              addPost();
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
          state.posts.map((element) => {
            if (element.userId == state.user.id) {
              return (
                <>
                  <div className="card">
                    <AiTwotoneEdit
                      onClick={() => {
                        setUpdate(true);
                      }}
                    />
                    {update ? (
                      <></>
                    ) : (
                      <>
                        <div className="card-title-body">
                          <p className="para">Title: </p>
                          <p>{element.title}</p>
                          <p className="para">Body: </p>
                          <p>{element.body}</p>
                        </div>
                        <p className="comments">COMMENTS:</p>
                        {state.comments ? (
                          state.comments.map((elementCom) => {
                            if (element.id === elementCom.postId) {
                              return (
                                <>
                                  <div className="card-title-body">
                                    <p className="para">Name:</p>
                                    <p>{elementCom.name}</p>
                                    <p className="para">Email:</p>
                                    <p>{elementCom.email}</p>
                                    <p className="para">Body:</p>
                                    <p>{elementCom.body}</p>
                                  </div>
                                </>
                              );
                            }
                          })
                        ) : (
                          <></>
                        )}
                      </>
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
                      <p>{element.title}</p>
                      <p className="para">Body: </p>
                      <p>{element.body}</p>
                    </div>
                    <p className="comments">COMMENTS:</p>
                    {state.comments ? (
                      state.comments.map((elementCom) => {
                        if (element.id === elementCom.postId) {
                          return (
                            <>
                              <div className="card-title-body">
                                <p className="para">Name:</p>
                                <p>{elementCom.name}</p>
                                <p className="para">Email:</p>
                                <p>{elementCom.email}</p>
                                <p className="para">Body:</p>
                                <p>{elementCom.body}</p>
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
