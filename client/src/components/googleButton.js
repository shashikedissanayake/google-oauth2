import React, { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import querystring from 'query-string';
// import {GoogleLogin} from 'react-google-login';

const Button = (props) => {
  const [token, setToken] = useState(''); 
  useEffect(()=> {
    const queryParams = querystring.parse(props.location.search);
    setToken(queryParams.token);
    console.log(queryParams.token)
  }, [props.location.search]);
    // const failLogin = () => {
    //     console.log('failed')
    // }
    // const handleLogin = async (googleData) => {
    //     console.log('teftet')
    //     console.log(googleData)
    //     const res = await fetch(`http://localhost:3001/auth/google/${googleData.tokenId}`, {
    //         method: "GET",
    //       headers: {
    //         "Content-Type": "application/json"
    //       }
    //     })
    //     const data = await res.json()
    //     console.log(data);
    //   }
    const login = () => {
      const auth = window.open('http://localhost:3001/auth/google', '_self', 'width=500,height=600');
    //   setTimeout(() => {
    //     console.log(auth.window.location);
    // }, 1000);
      console.log(auth.window.location);
    }
    return (
      token ? <h2>Login success</h2> : <GoogleButton onClick={login}/>
        // <GoogleLogin
        //     clientId={'788333224978-s2ocrqf26d45cl05d8ksg59bchrj0riq.apps.googleusercontent.com'}
        //     buttonText="Log in with Google"
        //     onSuccess={handleLogin}
        //     onFailure={failLogin}
        // />
    );
}

export default Button;