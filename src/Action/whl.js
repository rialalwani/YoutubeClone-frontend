import * as api from "../API/index.js"

export const addtowhl=(whldata)=>async(dispatch)=>{
    try{
        const data=await api.addtowhl(whldata)
        dispatch({type:"ADD_TO_WHL",data})
        dispatch(getwhl())
    }
    catch(error){
        console.log(error.message)
    }
}

export const getwhl=()=>async(dispatch)=>{
    try{
        const data=(await api.getwhl())?.data
        dispatch({type:"GET_WHL",data})
    }
    catch(error){
        console.log(error.message)
    }
}

export const deletewhl=(whldata)=>async(dispatch)=>{
    //console.log(whldata)
     try{
         const data=await api.deletewhl(whldata)
         //console.log(data)
         dispatch({type:"REMOVE_FROM_WHL",data})
         dispatch(getwhl())
     }
     catch(error){
        console.log(error.message)
    }
}