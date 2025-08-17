import * as api from "../API/index.js"

export const creategroup=(groupdata)=>async(dispatch)=>{
    try{
        const data=await api.creategroup(groupdata).data
        console.log(data)
        dispatch({type:"CREATE_GROUP",data})
    }
    catch(error){
        console.log(error.message)
    }
}
export const getallgroups=()=>async(dispatch)=>{
    try{
        const data=await (await api.getallgroups()).data
        dispatch({type:"GET_GROUPS",data})
    }
    catch(error){
        console.log(error.message)
    }
}
export const updategroup=({_id,groupdata})=>async(dispatch)=>{
    console.log(_id,groupdata)
    try{
        const data=await api.editgroup({_id,groupdata})
        console.log(data)
        dispatch({type:"UPDATE_GROUP",data})
    }
    catch(error){
        console.log(error.message)
    }
}
export const deletegroup=({_id,userid})=>async(dispatch)=>{
    try{
        const data=await api.deletegroup(_id,userid).data
        dispatch({type:"DELETE_GROUP",data})
    }
    catch(error){
        console.log(error.message)
    }
}
