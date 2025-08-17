import "./Videocall.css";
import {useSelector} from "react-redux"
import { useState,useCallback, useEffect } from "react";
import { useSocket } from "../../context/SocketProvider";
import { useNavigate } from "react-router-dom";

const Videocall=()=>{
    const currentuser=useSelector(s=>s.currentuserreducer)?.result
    const email=currentuser?.email
    const [room,setroom]=useState("")
    const socket=useSocket()
    const navigate=useNavigate()

    const handlesubmit=useCallback((e)=>{
        //e.preventDefault();
        if(!email)
            alert("Sign in to make a videocall")
        else if(!room)
            alert("Enter a room number")
        else
        socket.emit("room:join",{email,room})
    },[room,email,socket])

    const handleJoinRoom=useCallback((data)=>{
        const {email,room}=data
        navigate(`/room/${room}`)
    })
  
    useEffect(()=>{
        socket.on('room:join',data=>{
            //const {email,room}=data
            console.log(email,room)
            handleJoinRoom(data)
        })
        return()=>{
            socket.off("room:join")
        }
    },[socket,handleJoinRoom])

    return(
        <div className="lobby">
            <div className="firsttext"><h1>Enjoy Video call with Friends</h1></div>
            <div className="secondtext"><h2>Enter any room number and join</h2></div>
            <div className="secondtext"><h2>Tell your friends to join</h2></div>
            <div className="secondtext"><h2>With the same room number</h2></div>
            <div className="videocallform">
            <label className="room-no-label">Room Number:</label>
            <input type="text" id="room" value={room} onChange={e=>setroom(e.target.value)} className="room-no"></input>
            <button onClick={e=>handlesubmit()} className="Joinbtn">JOIN</button>
            </div>
        </div>
    )
}

export default Videocall