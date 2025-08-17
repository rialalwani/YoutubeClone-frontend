import { useState} from "react"
import { useSelector,useDispatch } from "react-redux"
import "./CreateEditChannel.css"
import {updatechanneldata} from "../../Action/channeluser.js"
import { login } from "../../Action/auth.js"

function CreateEditChannel({setCreateEditChannelBtn}){
    const currentuser=useSelector(state=>state.currentuserreducer)
    const dispatch=useDispatch()
    const [name,setname]=useState(currentuser?.result?.name)
    const [desc,setdesc]=useState(currentuser?.result?.desc)

    const HandleSubmit=()=>{
        if(!name)
            alert("Please enter your/channel name")
        else if(!desc)
            alert("Please enter channel description")
        else{
          //console.log("works")
          dispatch((updatechanneldata(currentuser?.result?._id,{name:name,desc:desc})))
          setCreateEditChannelBtn(false)
          setTimeout(()=>{
            dispatch(login({email:currentuser?.result?.email}))
          },5000)
        }
    } 
    return(
        <div>
          <input type='submit' value="X" onClick={e=>setCreateEditChannelBtn(false)} className="ibtn_x"></input>
          <div className="CreateEditChannelDiv">
            <h2 style={{textAlign:'center', textDecoration:"underline", color:"aliceblue"}}>{currentuser?.result?.name?<>Edit</>:<>Create</>} Your Channel</h2>
            <input type="text" placeholder="Enter Your/Channel Name " value={name} onChange={e=>setname(e.target.value)} className="ChannelNameBox"></input>
            <textarea placeholder="Enter Channel Description" className="ChannelDescBox" value={desc} onChange={e=>setdesc(e.target.value)}></textarea>
            <input className="submitBtn" type='submit' value="submit" onClick={e=>HandleSubmit()}></input>
          </div>
        </div>
    )
}

export default CreateEditChannel