import "./VideoPage.css" 
import { useParams } from "react-router-dom"
import moment from "moment"
import LikeWatchlaterSave from "../../Components/LikeWatchlaterSave/LikeWatchlaterSave"
import Comments from "../../Components/Comments/Comments"
import { useSelector,useDispatch } from "react-redux"
import { viewvideo } from "../../Action/video.js"
import { useEffect } from "react"
import { addtohistory } from "../../Action/history.js"

function VideoPage(){
    var videoId=useParams("")
    /*const videos=[{id:1,src:Video1,channel:"Spencer Melvin",title:"Summer fun", uploader:"Spencer Melvin",description:"Beach Fun with frnds!!!",views:"150"},
        {id:2,src:Video2,channel:"Dancing Divas",title:"Dance video",uploader:"Louis Angela",description:"Dancing and Enjoying" ,views:"250"},
        {id:3,src:Video3,channel:"Nature Lovers",title:"Bird video",uploader:"Nishta Gaur",description:"Single shot bird video captured",views:"750"},
        {id:4,src:Video4,channel:"Animal Lovers",title:"Cute Penguins",uploader:"Avika Singh",description:"Cute video of Penguins",views:"100"}
    ]*/
   //console.log(videoId.id)
   const currentuser=useSelector(state=>state.currentuserreducer)?.result
   const videos=useSelector(state=>state.videoreducer)
    const vid=videos?.data?.data?.filter(v=>parseInt(v._id)===parseInt(videoId.id))[0];
    //console.log(videos)
    const dispatch=useDispatch()
    const handleviews=()=>{
        dispatch(viewvideo({id:videoId.id}))
    }
    const handlehistory=()=>{
        dispatch(addtohistory({
            videoid:videoId.id,
            userid:currentuser._id
        }))
    }
    useEffect(()=>{
        if(currentuser)
        {
           handlehistory() 
        }
        handleviews()
    },[])

    return(
        <div className="VideoPageDiv">
            {vid&&
            <video className="VideoDisplay" controls><source src={`https://youtubeclone-g7ci.onrender.com/${vid.filepath}`} type="video/mp4"></source></video>}
            <div style={{marginLeft:"0.7rem"}}>{vid?.videotitle}</div>
            <div className="VideoPageContainer1">
                <div className="VideoPageContainer2">
                    <div>{vid?.views} views</div>
                    <div className="dot"></div>
                    <div>{moment(vid?.createdat).fromNow()}</div>
                </div>
                <div><LikeWatchlaterSave vid={vid} videos={videos}/></div>
            </div>
            <div className="Straight-Line-3"></div>
            <div className="VideoPageContainer3">
              <div className="First-letter-div">
                <div className="First-letter">{vid?.uploader?.charAt(0).toUpperCase()}</div>
              </div>
              <div style={{marginTop:"0.3rem"}}>{vid?.uploader}</div>
            </div>
            <div className="Straight-Line-3"></div>
            <div style={{marginLeft:"0.7rem", textDecoration:"underline"}}>Comments</div>
            <Comments id={videoId.id}/>
        </div>
    )
}

export default VideoPage