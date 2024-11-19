export const serverReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_CURRENT_SERVER":
        return action.payload;
        default:
        return state;
    }
};






/*

isAuthenticated
name
icon
id
email

urls
*/