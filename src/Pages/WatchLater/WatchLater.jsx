import WHL from "../../Components/WHL/WHL.jsx";
import { useSelector } from "react-redux";

function WatchLater(){
    /*const videos=[{id:1,src:Video1,channel:"Spencer Melvin",title:"Summer fun", uploader:"Spencer Melvin",description:"Beach Fun with frnds!!!",views:"150"},
        {id:2,src:Video2,channel:"Dancing Divas",title:"Dance video",uploader:"Louis Angela",description:"Dancing and Enjoying" ,views:"250"},
        {id:3,src:Video3,channel:"Nature Lovers",title:"Bird video",uploader:"Nishta Gaur",description:"Single shot bird video captured",views:"750"},
        {id:4,src:Video4,channel:"Animal Lovers",title:"Cute Penguins",uploader:"Avika Singh",description:"Cute video of Penguins",views:"100"}
    ]*/
    const currentuser=useSelector(s=>s.currentuserreducer)?.result
    const videos=useSelector(s=>s.whlreducer)?.data?.filter(vids=>vids.userid===currentuser?._id)
    return(
        <div>
        <WHL page={"Watch Later"} videolist={videos}/>
     </div>
    )
}

export default WatchLater