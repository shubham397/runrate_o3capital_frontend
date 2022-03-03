import {
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOGOUT,
 } from "../actions/types";
 const user = JSON.parse(localStorage.getItem("token"));
 const userId = JSON.parse(localStorage.getItem("userId"));
 const initialState = user
   ? { isLoggedIn: true, user, userId }
   : { isLoggedIn: false, user: null, userId:null };
 export default function (state = initialState, action) {
   const { type, payload } = action;
   switch (type) {
     case REGISTER_SUCCESS:
       return {
         ...state,
         isLoggedIn: false,
       };
     case REGISTER_FAIL:
       return {
         ...state,
         isLoggedIn: false,
       };
     case LOGIN_SUCCESS:
       return {
         ...state,
         isLoggedIn: true,
         user: payload.user,
         userId: payload.userId
       };
     case LOGIN_FAIL:
       return {
         ...state,
         isLoggedIn: false,
         user: null,
       };
     case LOGOUT:
       return {
         ...state,
         isLoggedIn: false,
         user: null,
       };
     default:
       return state;
   }
 }