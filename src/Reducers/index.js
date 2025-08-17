import {combineReducers} from "redux"
import authreducer from "./auth.js"
import currentuserreducer from "./currentuser.js"
import channelreducer from "./channel.js"
import { videoreducer } from "./video.js"
import commentreducer from "./comment.js"
import historyreducer from "./history.js"
import whlreducer from "./whl.js"
import likedvideosreducer from "./likedvids.js"
import groupreducer from "./group.js"

export default combineReducers({
    authreducer,
    currentuserreducer,
    channelreducer,
    videoreducer,
    commentreducer,
    historyreducer,
    likedvideosreducer,
    whlreducer,
    groupreducer,
}) 