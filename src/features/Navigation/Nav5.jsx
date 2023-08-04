import React from "react";
// import axios from "axios";
import LayOut from "../../HOCs/Layout";
import Error404 from "./Error404";
const Nav5 = () => {

  const [login, setLogin] = useState(false)
  const responseFacebook = (response) => {
    let { userId, name } = response
    axios({
      method: "POST",
      url: "http://localhost:8080/api/user/login-facebook",
      data: {
        user_id: userId,
        userName: name
      }
    }).then(res => {
      // console.log(res)
      localStorage.setItem('userLogin', res.data.data)
      setLogin(true)
    })
  };
  return (
    <LayOut>
      <Error404 />
      <div className="text-white">
        <ReactFacebookLogin
          appId="6042058729222539"
          fields="name,email,picture"
          callback={responseFacebook}
        />
        {login ? <h1 className="text-white">Đã login</h1> : <h1 className="text-white">Chưa login</h1>}
      </div>
    </LayOut>
  );
};

export default Nav5;
