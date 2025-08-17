const historyreducer=(state={data:null},action)=>{
    //console.log(action)
    switch (action?.type){
        case "ADD_TO_HISTORY":
            return {...state}
        case "FETCH_HISTORY":
            return {...state,data:action.data}
        case "DELETE_HISTORY":
            return {...state}
        default:
            return state
    }
}

export default historyreducer