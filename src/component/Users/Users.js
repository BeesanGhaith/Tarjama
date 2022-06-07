import "./Users.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../reducer/users/index";

function Users() {
  const [albums, setAlbums] = useState([]);

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      posts: state.postsReducer.posts,
      users: state.usersReducer.users,
    };
  });

  const getUsers = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        dispatch(setUsers(response.data));
      })
      .catch((error) => {});
  };

  const getAlbums = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then((response) => {
        setAlbums(response.data);
      })
      .catch((error) => {});
  };

  let count = 0;
  let counOfPost = 0;

  useEffect(() => {
    getUsers();
    getAlbums();
  }, []);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>The Number Of Posts</th>
            <th>The Number Of Albums</th>
          </tr>
        </thead>
        <tbody>
          {state.users &&
            state.users.map((user) => {
              count = 0;
              counOfPost = 0;
              return (
                <>
                  <tr>
                    <td>{user.name}</td>
                    {state.posts &&
                      state.posts.map((post) => {
                        if (user.id == post.userId) {
                          counOfPost++;
                        }
                      })}
                    <td>{counOfPost}</td>
                    {albums &&
                      albums.map((album) => {
                        if (user.id == album.userId) {
                          count++;
                        }
                      })}
                    <td>{count}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default Users;
