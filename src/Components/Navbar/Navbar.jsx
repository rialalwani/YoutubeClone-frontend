import Searchbar from "../Searchbar/Searchbar.jsx"
import "./Navbar.css"
import { MdOutlineVideoCall } from "react-icons/md";
import { BsGrid3X3Gap } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import Auth from "../../Pages/Auth/Auth.jsx"
import { useState,useEffect} from "react";
import { useGoogleLogin ,googleLogout} from '@react-oauth/google';
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import {login} from "../../Action/auth.js"
import { setcurrentuser } from "../../Action/currentuser.js";
import {jwtDecode} from "jwt-decode"
import { Link } from "react-router-dom";
import img from "./youtube-logo.svg"

function Navbar({toggleDrawer,setCreateEditChannelBtn}){
    const [AuthBtn,setAuthBtn]=useState(false)
    const [user,setuser]=useState({})
    const [profile,setprofile]=useState({})
    const dispatch=useDispatch()
    
    const successlogin=()=>{
    if(profile && profile.email){
        dispatch (login({email:profile.email}))
        //console.log(profile.email)
    }}
    
    const currentuser=useSelector(state=>state.currentuserreducer)
    //console.log(currentuser)
    const displayName = currentuser?.result?.name || currentuser?.result?.email || "";

    const funcAuthBtn=()=>{
        if(AuthBtn)
            setAuthBtn(false)
        else
        setAuthBtn(true)
    }

    const Googlelogin=useGoogleLogin({
        onSuccess:tokenresponse=>{console.log(tokenresponse);setuser(tokenresponse)},
        onError:error=>console.log("Login Failed",error)
    })


    useEffect(
        ()=>{
            if(user?.access_token){
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,{
                headers:{
                    Authorization:`Bearer ${user.access_token}`,
                    Accept:'application/json'
                },
                })
                .then((res)=>{
                    setprofile(res.data)
                    console.log(res.data)
                    successlogin()
                })
                .catch((err)=>console.log(err.toJSON()))
            }
        },
        [user]
    )
    const logout=()=>{
        //console.log("Logout function working")
        dispatch(setcurrentuser(null))
        localStorage.clear()
        googleLogout()
      }

      useEffect(()=>{
        const token=currentuser?.token;
        if(token){
          const decodetoken=jwtDecode(token)
          if(decodetoken.exp *1000<new Date().getTime()){
            logout()
          }
        }
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))))
      },[currentuser?.token,dispatch]
    )

    return(
        <div className="NavbarDiv">
            <div className="logoAndSettings">
                <div className="Settings" onClick={e=>toggleDrawer()}>
                   <div className="horizontalLines"></div> 
                   <div className="horizontalLines"></div>
                   <div className="horizontalLines"></div>
                </div>
                <div className="youtube-logo">
                    <img src={img} alt="youtube-logo" height={"27rem"} width={"27rem"}></img>
                    <p>YourTube</p>
                </div>
            </div>
            <Searchbar/>
            <div className="Nav-btns-div">
                <Link to="/videocall">
               <MdOutlineVideoCall className="Nav-btns" color="aliceblue"/>
               </Link>
               <BsGrid3X3Gap className="Nav-btns"/>
               <IoIosNotificationsOutline className="Nav-btns"/>
               {displayName?<div>
               <div className="first-letter-div" onClick={e=>funcAuthBtn()}>
                <div className="first-letter">{displayName.charAt(0).toUpperCase()}</div>
               </div>
               {AuthBtn&&
                <Auth setCreateEditChannelBtn={setCreateEditChannelBtn} setAuthBtn={setAuthBtn}/>
                }</div>
               :
               <div><button className="signInBtn" onClick={e=>Googlelogin()}>Sign In</button></div>
               }
            </div>
        </div>
    )
}

export default Navbar 