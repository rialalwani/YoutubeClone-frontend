import * as api from "../API/index.js"

export const addtohistory = (historydata) => async (dispatch) => {
    try {
        //console.log(historydata)
        const data = await api.addtohistory(historydata)
        //console.log(data)
        dispatch({ type: "ADD_TO_HISTORY", data })
        dispatch(getallhistory())
    }
    catch (error) {
        console.log(error.message)
    }
}

export const getallhistory = () => async (dispatch) => {
    try{
        const data=(await api.getallhistory())?.data
        //console.log(data)
        dispatch({type:"FETCH_HISTORY",data})
    }
    catch(error){
        console.log(error.message)
    }
}

export const deletehistory=(userdata)=>async(dispatch)=>{
    try{
        const userid=userdata
        //console.log(userid)
        const data=(await api.deletehistory({userid}))
        dispatch({type:"DELETE_HISTORY",data})
        dispatch(getallhistory())
    }
    catch(error){
        console.log(error.message)
    }
}