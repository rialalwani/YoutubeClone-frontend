import "./LikeWatchlaterSave.css"
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { BsSave } from "react-icons/bs";
import { BsFillSaveFill } from "react-icons/bs";
import { TbShare3 } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { likevideo } from "../../Action/video.js"
import { addtolikedvideos, deletelikedvideos } from "../../Action/likevids.js";
import { addtowhl, deletewhl } from "../../Action/whl.js"

function LikeWatchlaterSave({ vid, videos }) {
    const [likebtn, setlikebtn] = useState(false)
    const [dislikebtn, setdislikebtn] = useState(false)
    const [savebtn, setsavebtn] = useState(false)
    const [subscribe, setsubscribe] = useState(false)
    const dispatch = useDispatch()
    const currentuser = useSelector(state => state.currentuserreducer)?.result
    const likedvideos = useSelector(s => s.likedvideosreducer)?.data
    const watchlatervideos = useSelector(s => s.whlreducer)?.data

    useEffect(() => {
        likedvideos?.filter(v => v.videoid === vid?._id && v.userid === currentuser?._id).map((m) => setlikebtn(true))
        watchlatervideos?.filter(v => v.videoid === vid?._id && v.userid === currentuser?._id).map((m) => setsavebtn(true))
    }, [])

    const setLike = (e, Like) => {
        if (currentuser) {
            if (likebtn) {
                setlikebtn(false)
                dispatch(likevideo({ id: vid._id, Like: Like - 1 }))
                dispatch(deletelikedvideos({ videoid: vid._id, userid: currentuser._id }))
            }
            else {
                setlikebtn(true)
                setdislikebtn(false)
                //console.log(vid)
                dispatch(likevideo({ id: vid._id, Like: Like + 1 }))
                dispatch(addtolikedvideos({ videoid: vid._id, userid: currentuser._id }))
            }
        }
        else {
            alert("Please login")
        }
    }
    const setDislike = (e, Like) => {
        if (currentuser) {
            if (dislikebtn)
                setdislikebtn(false)
            else {
                if (likebtn) {
                    dispatch(likevideo({ id: vid._id, Like: Like - 1 }))
                    dispatch(deletelikedvideos({ videoid: vid._id, userid: currentuser._id }))
                }
                setlikebtn(false)
                setdislikebtn(true)
            }
        }
        else {
            alert("Please login")
        }
    }
    const setSave = () => {
        if (currentuser) {
            if (savebtn) {
                setsavebtn(false)
                dispatch(deletewhl({ videoid: vid._id, userid: currentuser._id }))
            }
            else {
                setsavebtn(true)
                dispatch(addtowhl({ videoid: vid._id, userid: currentuser._id }))
            }
        }
        else {
            alert("Please login")
        }
    }

    return (
        <div className="ButtonsDiv">
            <div className="IconDiv">
                <div className="IconLogo" onClick={e => setLike(e, vid?.likes)}>{likebtn ? <AiFillLike /> : <AiOutlineLike />}</div>
                <div>{vid?.likes}</div>
            </div>
            <div className="IconDiv">
                <div className="IconLogo" onClick={e => setDislike(e, vid?.likes)}>{dislikebtn ? <AiFillDislike /> : <AiOutlineDislike />}</div>
                <div>Dislike</div>
            </div>
            <div className="SaveBtnDiv">
                {savebtn ?
                    <div className="IconDiv" onClick={e => setSave()}>
                        <div className="IconLogo"><BsFillSaveFill /></div>
                        <div>Saved</div>
                    </div>
                    :
                    <div className="IconDiv" onClick={e => setSave()}>
                        <div className="IconLogo"><BsSave /></div>
                        <div>Save</div>
                    </div>
                }
            </div>
            <div className="IconDiv">
                <div className="IconLogo"><TbShare3 /></div>
                <div>Share</div>
            </div>
            <div className="IconDiv">
                <div className="IconLogo"><BsThreeDots /></div>
            </div>
        </div>
    )
}

export default LikeWatchlaterSave