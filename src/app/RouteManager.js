import { Navigate } from "react-router-dom";

const RoutesManagers = (props) => {
  const { isPublic, isAuth, Component, redirectPatch } = props;
  // const logged = useSelector((state) => state.auth.userLogin);
  const logged = true;
  let localToken = localStorage.getItem("betaToken");
  if (localToken && localToken.length < 300) {
    localToken = "";
    localStorage.setItem("betaToken", "");
  }
  // Không được vào trang đăng ký và đăng nhập
  if (isAuth) {
    // Nếu đã đăng nhập vui lòng về Home, chưa thì ở lại
    return logged ? <Navigate to="/" /> : <Component />;
  }
  // Trang này không thể được vào nếu chưa đăng nhập
  if (!isPublic) {
    // Nếu đã đăng nhập cho ở lại, chưa thì ra trang đăng ký
    return localToken ? <Component /> : <Navigate to={redirectPatch} />;
  }
  return <Component />;
};
export default RoutesManagers;
