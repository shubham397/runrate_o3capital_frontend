import {
    GET_CONTACT,
    DELETE_CONTACT,
    ADD_CONTACT,
  } from "../actions/types";
  const initialState = {
      contact:""
  };
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case GET_CONTACT:
        return {
          ...state,
          contact: payload.contact
        };
      case DELETE_CONTACT:
        return {
          ...state,
          contact: payload.contact
        };
      case ADD_CONTACT:
        return {
          ...state,
          contact: payload.contact,
        };
      default:
        return state;
    }
  }