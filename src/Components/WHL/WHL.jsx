import { deletehistory } from "../../Action/history.js"
import LeftSidebar from "../LeftSidebar/LeftSidebar"
import ShowVideo from "../ShowVideo/ShowVideo"
import "./WHL.css"
import { useDispatch, useSelector } from "react-redux"

function WHL({page,videolist}){
    const dispatch=useDispatch()
    const currentuser=(useSelector(state=>state.currentuserreducer))?.result
    const videos=useSelector(state=>state.videoreducer)?.data?.data
    const vids=videos?.filter(vid=>videolist?.some(v=>v.videoid===vid._id)).reverse()
    //console.log(videolist)
    //console.log(videos)
    //console.log(vids)
    const handleclearhistory=()=>{
        dispatch(deletehistory(currentuser?._id))
    }

    return(
        <div className="WHLDiv">
            <LeftSidebar/>
            <div className="WHLDiv1">
                <div className="WHLDiv2">
                    <h2 style={{marginLeft:"4rem"}}>Your {page} Shown Here</h2>
                    {page==="History" &&
                    <div  style={{marginLeft:"4rem"}} className="clrhistorybtn" onClick={e=>handleclearhistory()}>Clear History</div>}
                </div>
                <div className="WHLDiv3">
                    <h3>{page}</h3>
                    <div className="whl-video-grid">
                        {vids?.map(v=><div key={v._id}><ShowVideo v={v}></ShowVideo></div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WHL