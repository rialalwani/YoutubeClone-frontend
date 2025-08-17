import * as api from "../API/index.js"

export const addtolikedvideos=(likedvidsdata)=>async(dispatch)=>{
    try{
        const data=await api.addtolikedvideos(likedvidsdata)
        dispatch({type:"ADD_TO_LIKED_VIDEOS",data})
        dispatch(getlikedvideos())
    }
    catch(error){
        console.log(error.message)
    }
}

export const getlikedvideos=()=>async(dispatch)=>{
    try{
        const data=(await api.getlikedvideos())?.data
        //console.log(data)
        dispatch({type:"GET_LIKED_VIDEOS",data})
    }
    catch(error){
        console.log(error.message)
    }
}

export const deletelikedvideos=(likedvidsdata)=>async(dispatch)=>{
     try{
         const data=(await api.deletelikedvideos(likedvidsdata))
         dispatch({type:"REMOVE_LIKED_VIDEOS",data})
         dispatch(getlikedvideos())
     }
     catch(error){
        console.log(error.message)
    }
}