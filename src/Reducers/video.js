export const videoreducer=(state=[],action)=>{
    switch(action?.type){
         case "POST_VIDEO":
            return {...state}
         case "POST_LIKE":
            return {...state}
         case "POST_VIEWS":
            return {...state}
         case "FETCH_VIDEOS":
            return {...state,data:action.payload}
         default:
            return state
    }
}