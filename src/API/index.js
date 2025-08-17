import axios from "axios"
const API=axios.create({baseURL:'https://youtubeclone-g7ci.onrender.com'})

API.interceptors.request.use(req=>{
    if(localStorage.getItem("Profile")){
        //console.log(JSON.parse(localStorage.getItem("Profile")).token)
        req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`
    }
    return req
})

export const login=async(authdata)=>{
    return(
       await API.post("/user/login",authdata)
    )
} 

export const updatechanneldata=async(_id,updatedata)=>{
    return(
        await API.patch(`/user/update/${_id}`,updatedata)
    )
}
export const fetchallchannel=async()=>{
    return(
        await API.get("/user/getallchannels")
    )
}

export const uploadvideo=async(filedata,fileoption)=>{
    return(
        await API.post("/video/uploadvideo",filedata,fileoption)
    )
}
export const getallvideos=async()=>{
    return(
        await API.get("/video/getallvideos")
    )
}

export const likevideo=async(id,Like)=>{
    //console.log(Like)
    return(
        await API.patch(`/video/like/${id}`,{Like})
    )
}
export const viewvideo=async(id)=>{
    return(
        await API.patch(`/video/views/${id}`)
    )
}

export const postcomment=async(commentdata)=>{
    return(
        await API.post('/comment/postcomment',commentdata)
    )
}
export const getcomment=async()=>{
    return(
        await API.get('/comment/getcomment')
    )
}
export const deletecomment=async({_id})=>{
    //console.log(_id)
    return(
        await API.delete(`/comment/deletecomment/${_id}`)
    )
}
export const editcomment=async(_id,commentbody)=>{
    return(
        await API.patch(`/comment/editcomment/${_id}`,{commentbody})
    )
}
export const likecomment=async(_id,likes)=>{
    console.log(_id,likes)
    return(
        await API.patch(`/comment/like/${_id}`,{likes})
    )
}

export const addtohistory=async(historydata)=>{
    return(
        await API.post('/history/addtohistory',historydata)
    )
}
export const getallhistory=async()=>{
    return(
        await API.get('/history/getallhistory')
    )
}
export const deletehistory=async({userid})=>{
    //console.log(userid)
    return(
        await API.delete(`/history/deletehistory/${userid}`)
    )
}

export const addtolikedvideos=async(likedviddata)=>{
    return(
        await API.post("/video/addtolikedvideos",likedviddata)
    )
}
export const getlikedvideos=async()=>{
    return(
        await API.get("/video/getlikedvideos")
    )
}
export const deletelikedvideos=async(likedvidsdata)=>{
    console.log(likedvidsdata)
   return(
    await API.delete("/video/deletelikedvideos",{data:likedvidsdata})
   )
}

export const addtowhl=async(whldata)=>{
    return(
        await API.post("/video/addtowhl",whldata)
    )
}
export const getwhl=async()=>{
    return(
        await API.get("/video/getwhl")
    )
}
export const deletewhl=async(whldata)=>{
    console.log(whldata)
   return(
    await API.delete("/video/deletewhl",{data:whldata})
   )
}

export const creategroup=async(groupdata)=>{
    return(
        await API.post("/group/creategroup",groupdata)
    )
}
export const editgroup=async({_id,groupdata})=>{
    return(
        await API.patch(`/group/updategroup/${_id}`,groupdata)
    )
}
export const getallgroups=async()=>{
    return(
        await API.get('/group/getallgroups')
    )
}
export const deletegroup=async({_id,userid})=>{
    return(
        await API.delete(`/group/deletegroup/${_id}`,{userid:userid})
    )
}
export const translatecomment=async(data)=>{
    return(
        await API.post('/comment/translate',data)
    )
}