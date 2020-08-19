export default function(state = {}, action) {
    if (action.type === "friends-wannabe") {
        return { ...state, friendsWannabes: action.friendsWannabes };
    }

    return state;
}
