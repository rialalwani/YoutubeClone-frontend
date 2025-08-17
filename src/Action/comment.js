import * as api from "../API/index.js"

export const postcomment=(commentdata)=>async(dispatch)=>{
    try{
        const data=await api.postcomment(commentdata)
        dispatch({type:"POST_COMMENT",data})
        dispatch(getcomment())
    }
    catch(error){
        console.log(error.message)
    }
}

export const getcomment=()=>async(dispatch)=>{
    try{
        const data=(await api.getcomment()).data
        //console.log(data.data)
        dispatch({type:"FETCH_COMMENT",data})
    }
    catch(error){
        console.log(error.message)
    }
}

export const deletecomment=(commentid)=>async(dispatch)=>{
    console.log(commentid)
    try{
        const {_id}=commentid
        const data=await api.deletecomment({_id})
        dispatch({type:"DELETE_COMMENT",data})
        dispatch(getcomment())
    }
    catch(error){
        console.log(error.message)
    }
}

export const editcomment=(commentdata)=>async(dispatch)=>{
    try{
        const {_id,commentbody}=commentdata
        const data=await api.editcomment(_id,commentbody)
        dispatch({type:"EDIT_COMMENT",data})
        dispatch(getcomment())
    }
    catch(error){
        console.log(error.message)
    }
}
export const Likecomment=({_id,likes})=>async(dispatch)=>{
    console.log(_id,likes)
    try{
        const data=(await api.likecomment(_id,likes)).data
        console.log(data)
        if(data.likes===-2){
            dispatch(deletecomment(data))
        }
        else{
           dispatch({type:"LIKE_COMMENT",data})
        }
        dispatch(getcomment())
    }
    catch(e){
        console.log(e.message)
    }
}