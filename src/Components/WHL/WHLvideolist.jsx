import ShowVideo from "../ShowVideo/ShowVideo"
import { useSelector } from "react-redux"

function WHLvideolist({page,user,videos}){
    const vids=videos?.filter(v=>v?.userid===user?._id)
    const videolist=useSelector(s=>s.videoreducer)?.data?.data
    const vid=videolist?.filter(v=>vids?.some(vi=>vi?.videoid===v?._id)).reverse()
    return(
        <>
            {user?
            <> {vid?.map(v=><div key={v?._id}><ShowVideo v={v}/></div>)}</>
            :
            <h2>Please login to Watch your {page}</h2>
            }
       </>
    )
}

export default WHLvideolist