const groupreducer=(state=[],action)=>{
    console.log(state)
    switch (action.type){
        case "CREATE_GROUP":
            console.log(action.data)
            return [...state,action.data]
        case "GET_GROUPS":
            console.log(action.data)
            return action.data
        case "UPDATE_GROUP":
            return [state.map(
                s=>s._id===action.data._id?action.data:s
            )]
        case "DELETE_GROUP":
            console.log(action.data._id)
            return [state.filter(s=>s._id!==action.data._id)]
        default:
            return state
    }
}

export default groupreducer