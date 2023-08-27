import { SUCCESS, ERROR, CLEAR } from '../constants/ActionTypse';

export function alerts(state = {}, action) {
    switch (action.type) {
        case SUCCESS:
            return {
                type: 'SUCCESS',
                message: action.message
            };
        case ERROR:
            return {
                type: 'DANGER',
                message: action.message
            };
        case CLEAR:
            return {};
        default:
            return state
    }
}