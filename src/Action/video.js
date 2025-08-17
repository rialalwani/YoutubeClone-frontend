import * as api from "../API"

export const uploadvideo =(videodata)=> async (dispatch) => {
    try {
        const { filedata, fileoption } = videodata
        //console.log(videodata)
        //console.log(filedata)
        //console.log(fileoption)
        const data = await api.uploadvideo(filedata, fileoption)
        //console.log(data)
        dispatch({type:"POST_VIDEO",data})
        dispatch(getallvideos())
    }
    catch(err){
        console.log(err.response)
    }
}

export const getallvideos=()=>async(dispatch)=>{
    try{
        const data=await api.getallvideos()
        //console.log(data)
        dispatch({type:"FETCH_VIDEOS",payload:data})
    }
    catch(err){
        console.log(err.response)
    }
}

export const likevideo=(likedata)=>async(dispatch)=>{
    try{
        const {id,Like}=likedata
        //console.log(id,Like)
        const data=await api.likevideo(id,Like)
        //console.log(data)
        dispatch({type:"POST_LIKE",payload:data})
        dispatch(getallvideos())
    }
    catch(err)
    {
        console.log(err.response)
    }
}

export const viewvideo=(viewdata)=>async(dispatch)=>{
    try{
        const {id}=viewdata
        //console.log(typeof(id))
        const data=await api.viewvideo(id)
        //console.log(data)
        dispatch({type:"POST_VIEW",payload:data})
        dispatch(getallvideos())
    }
    catch(err)
    {
        console.log(err.response)
    }
}