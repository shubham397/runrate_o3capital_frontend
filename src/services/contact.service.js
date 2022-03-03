import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:4000/api/v1/contact";

const getAllContacts = (userId) => {
  return axios.get(API_URL + `/${userId}`,{ headers: authHeader() });
};

const deleteContact = ( userId, contactId ) => {
  return axios.delete(
    API_URL + `/${contactId}`,{
      headers: authHeader(),
      data: {
        userId: userId
      }
    }
  );
};


const postAddContact = (name, email, phone, userId) => {
  return axios.post(
    API_URL + '/',
      {
        name,
        email,
        phone,
        userId
      },
      {headers: authHeader()}
  );
};
export default {
  getAllContacts,
  deleteContact,
  postAddContact,
};
