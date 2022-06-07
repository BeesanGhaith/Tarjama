const initialState = {
    users: [],
}

const usersReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_USERS":
            return {
                ...state,
                users: payload
            };
        case "UPDATE_USERS":
            return {
                ...state,
                users: state.users.map((element) => {
                    if (element.id === payload.id) {
                        return payload;
                    }
                    return element;
                })
            }
        default:
            return state;
    }


}

export default usersReducer;


export const setUsers = (users) => {
    return { type: "SET_USERS", payload: users };
}

export const updateUsers = (updatedUsers) => {
    return { type: "UPDATE_USERS", payload: updatedUsers }
}