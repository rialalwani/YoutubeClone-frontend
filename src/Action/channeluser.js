import * as api from "../API"

export const fetchallchannel=()=>async(dispatch)=>{
    try{
        const {data}=await api.fetchallchannel();
        dispatch({type:"FETCH_CHANNELS",payload:data})
    }
    catch(err){
        console.log(err)
    }
}

export const updatechanneldata=(_id,updatedata)=>async (dispatch)=>{
    try{
        //console.log(_id,updatedata) 
        const res=await api.updatechanneldata(_id,updatedata)
        //console.log(res.data)
        dispatch({type:"UPDATE_DATA",payload:res.data})
    }
    catch(err)
    {
        console.log(err)
    }
} 