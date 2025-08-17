const authreducer=(state={data:null},action)=>{
  console.log(action)
    switch (action.type){
        case "AUTH":
          localStorage.setItem("Profile",JSON.stringify(action?.data))
          console.log(localStorage.getItem("Profile"))
          return{...state,data:JSON.parse(localStorage.getItem("Profile")) }
        case "Logout": // Handle logout action
          localStorage.removeItem("Profile"); // Remove user data from localStorage
          return { ...state, data:null}; // Clear user data from state
        default:
          return state
    } 
}

export default authreducer 