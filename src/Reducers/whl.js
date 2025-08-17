const whlreducer=(state={data:null},action)=>{
    //console.log(action)
    switch (action?.type){
        case "ADD_TO_WHL":
            return {...state}
        case "GET_WHL":
            return {...state,data:action.data}
        case "REMOVE_FROM_WHL":
            return {...state}
        default:
            return state
    }
}

export default whlreducer