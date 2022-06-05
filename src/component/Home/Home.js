import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";


function Home() {

    const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      user: state.loginReducer.user
    };
  });

  useEffect(() => {
      console.log(state.user);
  })
  return (
    <>
    
    </>
  )
}

export default Home