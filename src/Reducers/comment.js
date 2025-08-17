const commentreducer=(state={data:null},action)=>{
    //console.log(action)
    switch (action?.type){
        case "POST_COMMENT":
            return {...state}
        case "EDIT_COMMENT":
            return {...state}
        case "DELETE_COMMENT":
            return {...state}
        case "FETCH_COMMENT":
            return {...state,data:action.data}
        case "LIKE_COMMENT":
            return {...state}
        default:
            return state
    }
}

export default commentreducer