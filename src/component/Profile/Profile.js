import "./Profile.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiTwotoneEdit, AiFillCreditCard } from "react-icons/ai";
import axios from "axios";

function Profile() {
  const [status, setStatus] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [bs, setBs] = useState("");

  const state = useSelector((state) => {
    return {
      user: state.loginReducer.user,
    };
  });

  const getUserInfoById = async (id) => {
    await axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        console.log(response.data);
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUserInfo = async (id) => {
    await axios
      .patch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        name: fullName,
        username: userName,
        email: email,
        address: {
          street: street,
          suite: suite,
          city: city,
          zipcode: zipcode,
          phone,
          website,
        },
        phone: phone,
        website: website,
        company: {
          name: companyName,
          catchPhrase: catchPhrase,
          bs: bs,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserInfoById(state.user.id);
    console.log(userInfo.address.city);
  }, [userInfo]);

  return (
    <>
      <h1>Profile Page:</h1>
      <AiTwotoneEdit
        onClick={() => {
          setStatus(true);
          setFullName(state.user.name);
          setUserName(state.user.username);
          setEmail(state.user.email);
          setPhone(state.user.phone);
          setWebsite(state.user.website);
          setCity(state.user.address.value);
          setZipcode(state.user.address.value);
          setStreet(state.user.address.value);
          setSuite(state.user.address.value);
          setCompanyName(state.user.company.value);
          setCatchPhrase(state.user.company.value);
          setBs(state.user.company.bs);
        }}
      />
      <AiFillCreditCard
        onClick={() => {
          updateUserInfo(state.user.id);
          setStatus(false);
        }}
      />
      <div className="div-f">
        <div>
          <p>Name:</p>
          <p>User Name:</p>
          <p>Email:</p>
          <p>Phone:</p>
          <p>Web Site:</p>
        </div>
        {status ? (
          <>
            <div className="div-c">
              <input
                defaultValue={state.user.name}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
              <input
                defaultValue={state.user.username}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <input
                defaultValue={state.user.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                defaultValue={state.user.phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <input
                defaultValue={state.user.website}
                onChange={(e) => {
                  setWebsite(e.target.value);
                }}
              />
            </div>
          </>
        ) : (
          <div>
            <p>{userInfo.name}</p>
            <p>{userInfo.username}</p>
            <p>{userInfo.email}</p>
            <p>{userInfo.phone}</p>
            <p>{userInfo.website}</p>
          </div>
        )}
      </div>
      <div className="div-f">
        <p>Address</p>
        <div>
          <p>City:</p>
          <p>ZIP Code:</p>
          <p>Street</p>
          <p>Suite</p>
        </div>
        {status ? (
          <>
            <div className="div-c">
              <input
                defaultValue={state.user.address.city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <input
                defaultValue={state.user.address.zipcode}
                onChange={(e) => {
                  setZipcode(e.target.value);
                }}
              />
              <input
                defaultValue={state.user.address.street}
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
              />
              <input
                defaultValue={state.user.address.suite}
                onChange={(e) => {
                  setSuite(e.target.value);
                }}
              />
            </div>
          </>
        ) : (
          <div>
            <p>{userInfo.address.city}</p>
            <p>{userInfo.address.zipcode}</p>
            <p>{userInfo.address.street}</p>
            <p>{userInfo.address.suite}</p>
          </div>
        )}
      </div>
      <div className="div-f">
        <p>Company</p>
        <div>
          <p>Name:</p>
          <p>Catch Phrase:</p>
          <p>BS</p>
        </div>
        {status ? (
          <>
            <div className="div-c">
              <input
                defaultValue={state.user.company.name}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
              />
              <input
                defaultValue={state.user.company.catchPhrase}
                onChange={(e) => {
                  setCatchPhrase(e.target.value);
                }}
              />
              <input
                defaultValue={state.user.company.bs}
                onChange={(e) => {
                  setBs(e.target.value);
                }}
              />
            </div>
          </>
        ) : (
          <div>
            <p>{userInfo.company.name}</p>
            <p>{userInfo.company.catchPhrase}</p>
            <p>{userInfo.company.bs}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
