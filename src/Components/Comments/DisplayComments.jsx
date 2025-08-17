import "./DisplayComments.css"
import { useState } from "react"
import moment from "moment"
import { useSelector, useDispatch } from "react-redux"
import { editcomment, deletecomment, Likecomment } from "../../Action/comment"
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import LanguageList from "../LanguageList/LanguageList.jsx"

export function DisplayComments({ m }) {
    const [commentBody, setcommentBody] = useState("")
    const [cmntId, setcmntId] = useState("")
    const [editBtn, seteditBtn] = useState(false)
    const [likecomment, setlikecomment] = useState(false)
    const [dislikecomment, setdislikecomment] = useState(false)
    const [languagelist, showlanguagelist] = useState(false)
    const [translatedcomments, settranslatedcomments] = useState([])
    const dispatch = useDispatch()
    //const currentuser={Name:"Ria Lalwani"}
    const translatedcomment = translatedcomments.filter(c => c._id === m._id)[0]
    //console.log(translatedcomment)
    const currentuser = useSelector(state => state.currentuserreducer)
    const regex = /[^a-zA-Z0-9\s]/
    const handleEdit = () => {
        seteditBtn(true)
        setcommentBody(m.commentbody)
        setcmntId(m._id)
    }
    const handleSubmit = () => {
        if (!commentBody)
            alert("Please type in your comment")
        else {
            if (!regex.test(commentBody)) {
                dispatch(editcomment({ _id: cmntId, commentbody: commentBody }))
                setcommentBody("")
            }
            else {
                alert("Comment should not have special characters")
            }
        }
        seteditBtn(false)
    }

    const handleDel = () => {
        dispatch(deletecomment({ _id: m._id }))
    }
    const handlelanguagelist = () => {
        if (languagelist) {
            showlanguagelist(false)
        }
        else {
            showlanguagelist(true)
        }
    }
    const setlike = (likes) => {
        if (currentuser) {
            if (likecomment) {
                setlikecomment(false)
                dispatch(Likecomment({ _id: m._id, likes: likes - 1 }))
            }
            else {
                setlikecomment(true)
                setdislikecomment(false)
                dispatch(Likecomment({ _id: m._id, likes: likes + 1 }))
            }
        }
        else {
            alert("Please login")
        }
    }
    const setdislike = (likes) => {
        if (currentuser) {
            if (dislikecomment) {
                setdislikecomment(false)
            }
            else {
                setdislikecomment(true)
                setlikecomment(false)
                dispatch(Likecomment({ _id: m._id, likes: likes - 1 }))
            }
        }
        else{
            alert("Please login")
        }
    }
    return (
        <div className="showcomment">
            {editBtn ?
                <form onSubmit={e => handleSubmit()}>
                    <input value={commentBody} onChange={e => setcommentBody(e.target.value)} className="EditCmntBox"></input>
                    <input type="submit" value='change' className="EditBtn" />
                </form>
                :
                <div>
                    <p style={{ color: "rgba(255,255,255,0.6" }} className="userandtime">
                        {m.usercommented}
                        <div className="dot"></div>
                        {moment(m.commentedon).fromNow()}</p>
                    <p>
                        {translatedcomment ? translatedcomment.translatedcomment : m.commentbody}
                    </p>
                    <div>
                        <div className="likeandtranslate">
                            <div onClick={e => setlike(m.likes)}>
                                {likecomment ?
                                    <AiFillLike />
                                    :
                                    <AiOutlineLike />}
                                {m.likes}
                            </div>
                            <div onClick={e => setdislike(m.likes)}>
                                {dislikecomment ?
                                    <AiFillDislike />
                                    : <AiOutlineDislike />}
                            </div>
                            <div className="translatediv">
                                <div onClick={e => handlelanguagelist()}>Translate</div>
                                <div className="languagelist">
                                    {languagelist &&
                                        <LanguageList commentbody={m.commentbody} settranslatedcomments={settranslatedcomments} _id={m._id} />
                                    }
                                </div>
                            </div>
                        </div>
                        {currentuser?.result?._id === m.userid &&
                            <div>
                                <div className="EditAndDelete">
                                    <p onClick={e => handleEdit()}>Edit</p>
                                    <p onClick={e => handleDel()}>Delete</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>}
        </div>
    )
}