const isLogin = () => {
  const token = localStorage.getItem("accessToken");
  // console.log(token);
  if (token === null) {
    // console.log(token);
    return false;
  } else {
    return true;
  }
};
export default isLogin;
