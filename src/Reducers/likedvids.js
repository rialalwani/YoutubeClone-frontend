const likedvideosreducer=(state={data:null},action)=>{
    //console.log(action)
    switch (action?.type){
        case "ADD_TO_LIKED_VIDEOS":
            return {...state}
        case "GET_LIKED_VIDEOS":
            return {...state,data:action.data}
        case "REMOVE_LIKED_VIDEOS":
            return {...state}
        default:
            return state
    }
}

export default likedvideosreducer