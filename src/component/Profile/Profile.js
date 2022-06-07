import "./Profile.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiTwotoneEdit } from "react-icons/ai";
import axios from "axios";

function Profile() {
  const [status, setStatus] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [userInfoAddress, setUserInfoAddress] = useState([]);
  const [userInfoCompany, setUserInfoCompany] = useState([]);
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
        setUserInfo(response.data);
        setUserInfoAddress(response.data.address);
        setUserInfoCompany(response.data.company);
      })
      .catch((error) => {});
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
        setUserInfo(response.data);
        setUserInfoAddress(response.data.address);
        setUserInfoCompany(response.data.company);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getUserInfoById(state.user.id);
  }, []);

  return (
    <>
      <div className="div-icons">
        <h1>Profile Page:</h1>
        <AiTwotoneEdit
          className="edit-icon-pro"
          onClick={() => {
            setStatus(true);
            setFullName(userInfo.name);
            setUserName(userInfo.username);
            setEmail(userInfo.email);
            setPhone(userInfo.phone);
            setWebsite(userInfo.website);
            setCity(userInfoAddress.city);
            setZipcode(userInfoAddress.zipcode);
            setStreet(userInfoAddress.street);
            setSuite(userInfoAddress.suite);
            setCompanyName(userInfoCompany.name);
            setCatchPhrase(userInfoCompany.catchPhrase);
            setBs(userInfoCompany.bs);
          }}
        />
      </div>
      <div className="div-profile">
        <div className="div-info">
          <div className="info-title">
            <p>Name:</p>
            <p>User Name:</p>
            <p>Email:</p>
            <p>Phone:</p>
            <p>Web Site:</p>
          </div>
          {status ? (
            <>
              <div className="div-info-put">
                <input
                  defaultValue={userInfo.name}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                />
                <input
                  defaultValue={userInfo.username}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                <input
                  defaultValue={userInfo.email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <input
                  defaultValue={userInfo.phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
                <input
                  defaultValue={userInfo.website}
                  onChange={(e) => {
                    setWebsite(e.target.value);
                  }}
                />
              </div>
            </>
          ) : (
            <div className="info-body">
              <p>{userInfo.name}</p>
              <p>{userInfo.username}</p>
              <p>{userInfo.email}</p>
              <p>{userInfo.phone}</p>
              <p>{userInfo.website}</p>
            </div>
          )}
        </div>
        <div className="div-address-company">
          <div>
            <p className="info-title-p">Address :</p>
            <div className="div-info">
              <div className="info-title">
                <p>City:</p>
                <p>ZIP Code:</p>
                <p>Street:</p>
                <p>Suite:</p>
              </div>
              {status ? (
                <>
                  <div className="div-info-put">
                    <input
                      defaultValue={userInfoAddress.city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    />
                    <input
                      defaultValue={userInfoAddress.zipcode}
                      onChange={(e) => {
                        setZipcode(e.target.value);
                      }}
                    />
                    <input
                      defaultValue={userInfoAddress.street}
                      onChange={(e) => {
                        setStreet(e.target.value);
                      }}
                    />
                    <input
                      defaultValue={userInfoAddress.suite}
                      onChange={(e) => {
                        setSuite(e.target.value);
                      }}
                    />
                  </div>
                </>
              ) : (
                <div className="info-body">
                  <p>{userInfoAddress.city}</p>
                  <p>{userInfoAddress.zipcode}</p>
                  <p>{userInfoAddress.street}</p>
                  <p>{userInfoAddress.suite}</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <p className="info-title-p">Company :</p>
            <div className="div-info">
              <div className="info-title">
                <p>Name:</p>
                <p>Catch Phrase:</p>
                <p>BS:</p>
              </div>
              {status ? (
                <>
                  <div className="div-info-put">
                    <input
                      defaultValue={userInfoCompany.name}
                      onChange={(e) => {
                        setCompanyName(e.target.value);
                      }}
                    />
                    <input
                      defaultValue={userInfoCompany.catchPhrase}
                      onChange={(e) => {
                        setCatchPhrase(e.target.value);
                      }}
                    />
                    <input
                      defaultValue={userInfoCompany.bs}
                      onChange={(e) => {
                        setBs(e.target.value);
                      }}
                    />
                  </div>
                </>
              ) : (
                <div className="info-body">
                  <p>{userInfoCompany.name}</p>
                  <p>{userInfoCompany.catchPhrase}</p>
                  <p>{userInfoCompany.bs}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {status ? (
          <div className="div-edit-pro">
            <button
              className="btn-edit-pro"
              onClick={() => {
                updateUserInfo(state.user.id);
                setStatus(false);
              }}
            >
              Edit
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Profile;
