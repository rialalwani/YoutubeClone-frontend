import { DisplayComments } from "./DisplayComments.jsx"
import "./Comments.css"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { postcomment } from "../../Action/comment.js"

function Comments({ id }) {
    /*const commentList=[{
        id:1, commentbody:"Hello", userCommented:"Ria Lalwani"
    },
    {
         id:2, commentbody:"Nice Video", userCommented:"Ria Lalwani"
    },
    {
         id:3, commentbody:"Amazing", userCommented:"Ria Lalwani"
    },
    {
          id:4, commentbody:"Cute video", userCommented:"Ria Lalwani"
    }]*/
    const [commentText, setCommentText] = useState('')
    //const currentUser={Email:"rialalwani2003@gmail.com"}
    const currentUser = useSelector(state => state.currentuserreducer)?.result
    const commentList = useSelector(state => state.commentreducer)?.data
    //console.log(commentList)
    const dispatch = useDispatch()
    const regex = /[^a-zA-Z0-9\s]/
    const handleSubmit = () => {
        if (currentUser) {
            if (!commentText) {
                alert("Please enter your comment")
            }
            else {
                if (!regex.test(commentText)) {
                    dispatch(postcomment({
                        videoid: id,
                        commentbody: commentText,
                        userid: currentUser._id,
                        usercommented: currentUser.name
                    }))
                    setCommentText("")
                }
                else{
                    alert("Comment should not have special characters")
                }
            }
        }
        else {
            alert("Please login to comment")
        }
    }
    return (
        <div className="CommentsDiv ">
            <form className="CommentsForm" onSubmit={e => handleSubmit()}>
                <input type="text" placeholder="add comment" onChange={e => setCommentText(e.target.value)} value={commentText} className="addCommentBox"></input>
                <input type="submit" value="add" className="addBtn"></input>
            </form>
            <div>{commentList?.filter(c => parseInt(c.videoid) === parseInt(id)).reverse().map(
                m => {
                    return (
                        <DisplayComments m={m} />

                    )
                }
            )}</div>
        </div>
    )
}

export default Comments