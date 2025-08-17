import "./ShowVideo.css"
import moment from "moment"
import { Link } from "react-router-dom"

function ShowVideo({ v} ) {
    //console.log(v)
    return (
        <div className="VideoContainer">
            {v &&
                <Link to={"/videopage/" + v._id}>
                    <video className="video" width="240" height="140" controls><source src={`https://youtubeclone-g7ci.onrender.com/${v.filepath}`} type="video/mp4"></source></video>
                </Link>}
            <div className="VideoContainer1">
                <div className="first-letter-div">
                    <div className="first-letter">{v?.uploader?.charAt(0).toUpperCase()}</div>
                </div>
                <p>{v?.videotitle}</p>
            </div>
            <div>{v?.uploader}</div>
            <div className="VideoContainer2">
                <div>{v?.views} views</div>
                <div className="dot"></div>
                <div>{moment(v?.createdat).fromNow()}</div>
            </div>
        </div>
    )
}

export default ShowVideo