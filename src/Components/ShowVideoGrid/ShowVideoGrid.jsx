import "./ShowVideoGrid.css"
import ShowVideo from "../ShowVideo/ShowVideo.jsx"

function ShowVideoGrid({videos}){
    return(
        <div className="VideoGrid">
          {videos?.map(v=><div key={v._id}><ShowVideo v={v}/></div>)}
        </div>
    )
}

export default ShowVideoGrid