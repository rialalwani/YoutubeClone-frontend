import * as api from "../API";
import { setcurrentuser } from "./currentuser";

export const login = (authdata) => async (dispatch) => {
    console.log("Login action dispatched"); // Log to verify dispatch is happening
    try {
        const res=await api.login(authdata)
        //console.log(res)
        const data=res.data
        //console.log(data)
        dispatch({type:"AUTH",data})
        dispatch(setcurrentuser(JSON.parse((localStorage.getItem("Profile")))))
    }
    catch (err) {
        console.log(err.message)
    }
}  