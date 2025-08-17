const channelreducer = (state = [], action) => {
    //console.log(action)
    switch (action.type) {
        case "UPDATE_DATA":
            const exists = state.some((channel) => channel._id === action.payload._id);
            if (exists) {
                return state.map((channel) =>
                    channel._id === action.payload._id ? action.payload : channel
                );
            } else {
                // Add new channel if not found
                //console.log("works")
                return [...state, action.payload];
            }
        case "FETCH_CHANNELS":
            return action.payload 
        default:
            return state
    }
}

export default channelreducer