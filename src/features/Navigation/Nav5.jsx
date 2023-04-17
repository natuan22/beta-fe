import React, {  useState } from "react";
import ReactFacebookLogin from "react-facebook-login";
import axios from "axios";
const Nav5 = () => {

  const [login , setLogin] = useState(false)
  const responseFacebook = (response) => {
    let {userId, name} = response
    axios({
      method:"POST",
      url: "http://localhost:8080/api/user/login-facebook",
      data:{
        user_id: userId,
        userName: name
      }
    }).then(res=> {
      console.log(res)
      localStorage.setItem('userLogin', res.data.data)
      setLogin(true)
    })
  };
  return (
    <div className="text-white">
      <ReactFacebookLogin
        appId="941421577056547"
        fields="name,email,picture"
        callback={responseFacebook}
      />
      {login? <h1 className="text-white">Đã login</h1>:<h1 className="text-white">Chưa login</h1>}
    </div>
  );
};

export default Nav5;
