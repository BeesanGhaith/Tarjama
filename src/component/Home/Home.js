import "./Home.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Users from "../Users/Users";
import Posts from "../Posts/Posts";
import { FaUsers } from "react-icons/fa";
import {MdOutlinePostAdd} from "react-icons/md";

function Home() {
  const [users, setUsers] = useState(false);
  const [posts, setPosts] = useState(false);

  const state = useSelector((state) => {
    return {
      user: state.loginReducer.user,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });

  const navigate = useNavigate();

  return (
    <>
      <div className="div-home">
        <div className="div-left-menu">
          <div>
            <FaUsers className="users-icon" />
            <h2
              onClick={() => {
                setUsers(true);
                setPosts(false);
              }}
            >
              Users
            </h2>
          </div>
          <div>
            <MdOutlinePostAdd className="users-icon"/>
          <h2
            onClick={() => {
              setPosts(true);
              setUsers(false);
            }}
            >
            Posts
          </h2>
            </div>
        </div>
        <div>
          {users ? (
            <Users />
          ) : (
            <>
              <Posts />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
