import { GET_CONTACT, DELETE_CONTACT, ADD_CONTACT, SET_MESSAGE } from "./types";
import ContactService from "../services/contact.service";
export const getAllContacts = (userId) => (dispatch) => {
  return ContactService.getAllContacts(userId).then(
    (data) => {
      if (data.data.code === 200) {
        dispatch({
          type: GET_CONTACT,
          payload: { contact: data.data.data },
        });
        return Promise.resolve();
      } else {
        const message = data.data.message;
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const deleteContact = (userId, contactId) => (dispatch) => {
  return ContactService.deleteContact(userId, contactId).then(
    (data) => {
      if (data.data.code === 200) {
        dispatch({
          type: DELETE_CONTACT,
          payload: { contact: data.data.data },
        });
        return Promise.resolve();
      } else {
        const message = data.message;
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};

export const addContact = (name, email, phone, userId) => (dispatch) => {
  return ContactService.postAddContact(name, email, phone, userId).then(
    (response) => {
      if (response.data.code === 200) {
        dispatch({
          type: ADD_CONTACT,
          payload: { contact: response.data.data },
        });
        return Promise.resolve(response.data.message);
      } else {
        const message = response.data.message;
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject(message);
      }
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      return Promise.reject();
    }
  );
};
