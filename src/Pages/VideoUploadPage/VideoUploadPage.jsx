import { useState } from "react"
import "./VideoUploadPage.css"
import { buildStyles, CircularProgressbar } from "react-circular-progressbar"
import {useDispatch, useSelector} from "react-redux"
import {uploadvideo} from "../../Action/video.js"

function VideoUploadPage({setvideoUploadPage}){
    const [progress,setprogress]=useState(0)
    const [title,settitle]=useState("")
    const [videofile,setvideofile]=useState("")
    const dispatch=useDispatch()
    const currentuser=useSelector(state=>state.currentuserreducer)
    const fileoption={
      onUploadProgress:(progressEvent)=>{
        console.log(progressEvent)
        const {loaded,total}=progressEvent
        const percentage=Math.floor(((loaded/1000)/(total/1000)*100))
        //console.log(loaded,total,percentage)
        setprogress(percentage)
        if(percentage===100)
        {
          setTimeout(function (){},3000)
          setvideoUploadPage(false)
        }
      }
    }

    const OnUpload=()=>{
        if(!title)
            alert("Please enter title")
        else if(!videofile)
            alert("Please attach a video file")
        else if(videofile.size>10000000)
            alert("Please attach a file less than 10 mb")
        else{
          const filedata=new FormData()
          filedata.append("file",videofile)
          filedata.append("title",title)
          filedata.append("channel",currentuser?.result?._id)
          filedata.append("uploader",currentuser?.result?.name)
          dispatch(uploadvideo({filedata:filedata,fileoption:fileoption}))
          //setvideoUploadPage(false)
        }
    }
    return(
       <div className="VideoUploadPageDiv1">
          <input type='submit' value="X" onClick={e=>setvideoUploadPage(false)} className="ibtn_x"></input>
         <div className="VideoUploadPageDiv2">
          <div className="VideoUploadPageDiv3">
            <input type="text" placeholder="Enter title of your video" className="videotitle" onChange={e=>settitle(e.target.value)}></input>
            <input type="file" placeholder="Choose File" className="choosefile" onChange={e=>setvideofile(e.target.files[0])}></input>
            <input type="submit" value="Upload" className="submitfile" onClick={e=>OnUpload()}></input>
          </div>
          <CircularProgressbar
          value={progress} text={`${progress}`} styles={buildStyles({
            backgroundColor:"#3e98c7",
            trailColor:"#adff2f",
            textColor:'#f88',
            rotation:0.25,
            textSize:"20px",
            pathTransitionDuration:0.5,
            pathColor:`rgba(255,255,255,${progress/100})`,
            strokeLinecap:"butt"
          })}/>
         </div>
       </div>
    )
}

export default VideoUploadPage