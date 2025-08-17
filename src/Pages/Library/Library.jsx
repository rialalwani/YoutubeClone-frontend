import "./Library.css"
import LeftSidebar from "../../Components/LeftSidebar/LeftSidebar"
import { FaHistory } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { GrLike } from "react-icons/gr";
import WHLvideolist from "../../Components/WHL/WHLvideolist";
import {useSelector} from "react-redux"

function Library(){
    //const user={Email:"rialalwani2003@gmail.com",Name:"Ria Lalwani"}
    /*const videos=[{id:1,src:Video1,channel:"Spencer Melvin",title:"Summer fun", uploader:"Spencer Melvin",description:"Beach Fun with frnds!!!",views:"150"},
        {id:2,src:Video2,channel:"Dancing Divas",title:"Dance video",uploader:"Louis Angela",description:"Dancing and Enjoying" ,views:"250"},
        {id:3,src:Video3,channel:"Nature Lovers",title:"Bird video",uploader:"Nishta Gaur",description:"Single shot bird video captured",views:"750"},
        {id:4,src:Video4,channel:"Animal Lovers",title:"Cute Penguins",uploader:"Avika Singh",description:"Cute video of Penguins",views:"100"}
    ]*/
   const user=useSelector(s=>s.currentuserreducer)?.result
   const likedvideos=useSelector(s=>s.likedvideosreducer)?.data
   const whlvideos=useSelector(s=>s.whlreducer)?.data
   const history=useSelector(s=>s.historyreducer)?.data
    return(
        <div className="LibraryDiv">
            <LeftSidebar/>
            <div className="LibraryDiv1">
                <div className="LibraryDiv2">
                    <b style={{marginLeft:"1rem"}}><FaHistory/>History</b>
                    <div className="LibraryDiv3"><WHLvideolist page={"History"} user={user} videos={history} /></div>
                    <div className="Library-Page-division-line"></div>
                </div>
                <div className="LibraryDiv2">
                <b style={{marginLeft:"1rem"}}><MdOutlineWatchLater/>Watch Later</b>
                <div className="LibraryDiv3"><WHLvideolist page={"Watch Later"} user={user} videos={whlvideos} /></div>
                <div className="Library-Page-division-line"></div>
                </div>
                <div className="LibraryDiv2">
                <b style={{marginLeft:"1rem"}}><GrLike/>Liked Videos</b>
                <div className="LibraryDiv3"><WHLvideolist page={"Liked Videos"} user={user} videos={likedvideos} /></div>
                <div className="Library-Page-division-line"></div>
                </div>
            </div>
        </div>
    )
}
export  default Library