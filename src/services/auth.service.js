import axios from "axios";
const API_URL = "http://localhost:4000/api/v1/user/auth/";
const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    name: username,
    email: email,
    password: password
  });
};
const login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email: email,
      password: password,
    })
    .then((response) => {
      if (response.data.code === 200) {
        localStorage.setItem("token", JSON.stringify(response.data.data[0].token));
        localStorage.setItem("userId", JSON.stringify(response.data.data[0].userId));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
};
export default {
  register,
  login,
  logout,
};
