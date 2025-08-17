import ShowVideoGrid from "../../Components/ShowVideoGrid/ShowVideoGrid"
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar"
import "./YourVideos.css"
import {useSelector} from "react-redux"

function YourVideos(){
    /*const videos=[{id:1,src:Video1,channel:"Spencer Melvin",title:"Summer fun", uploader:"Spencer Melvin",description:"Beach Fun with frnds!!!",views:"150"},
        {id:2,src:Video2,channel:"Dancing Divas",title:"Dance video",uploader:"Louis Angela",description:"Dancing and Enjoying" ,views:"250"},
        {id:3,src:Video3,channel:"Nature Lovers",title:"Bird video",uploader:"Nishta Gaur",description:"Single shot bird video captured",views:"750"},
        {id:4,src:Video4,channel:"Animal Lovers",title:"Cute Penguins",uploader:"Avika Singh",description:"Cute video of Penguins",views:"100"}
    ]*/
   const currentuser=useSelector(state=>state.currentuserreducer)
   //console.log(currentuser?.result?._id)
   const videos=useSelector(state=>state.videoreducer)?.data?.data?.filter(q=>parseInt(q.videochannel)===parseInt(currentuser?.result?._id)).reverse()
   //console.log(useSelector(state=>state.videoreducer).data.data.filter(q=>parseInt(q.videochanel)===parseInt(currentuser.result._id)))
    return(
        <div style={{display:'flex', flexDirection:"row"}}>
           <LeftSidebar/>
           <div className="YourVideosDiv">
            <h2>Your Videos</h2>
            <ShowVideoGrid videos={videos}/>
            </div>
        </div>
    )
}

export default YourVideos