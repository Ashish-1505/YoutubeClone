import * as api from "../api";
import { setCurrentUser } from "./currentUser";

export const login = (authData) => async (dispatch) => {
    try {
      // console.log(authData);
      const { data } = await api.login(authData);
      dispatch({ type: "AUTH", data });
      dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    } catch (error) {
      alert(error);
    }
  };

export const getOTP=(authData)=>async()=>{
  try {
    // console.log(authData);
    await api.getOTP(authData)
  } catch (error) {
    alert(error)
  }
}
export const subscribe=(authData)=>async()=>{
    try {
      const creator=await api.subscribe(authData)
      // console.log(creator);
    } catch (error) {
      alert(error)
    }
}
export const unSubscribe=(authData)=>async()=>{
  try {
    const creator=await api.unSubscribe(authData)
    // console.log(creator);
  } catch (error) {
    alert(error)
  }
}
