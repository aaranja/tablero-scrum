import {
    BOARD_READ_START,
    BOARD_READ_SUCCESS,
    BOARD_READ_FAIL,
    CREATE_TASK_START,
    CREATE_TASK_SUCCESS,
    DELETE_TASK_START,
    DELETE_TASK_SUCCESS, UPDATE_TASK_FAIL, UPDATE_TASK_SUCCESS, UPDATE_TASK_START, CREATE_TASK_FAIL, DELETE_TASK_FAIL,
} from "../actionTypes";
import {updateObject} from "../utils";

const initialState = {
    payload: {
        pending: [], processing: [], completed: [],
    }, error: null, loading: false, status: "",
}

const boardReadFail = (state, action) => {
    return updateObject(state, {
        error: action.error, loading: false, status: "error",
    });
}

const boardReadStart = (state) => {
    return updateObject(state, {
        error: null, loading: true, status: "loading",
    });
}

const boardReadSuccess = (state, action) => {
    // let data = state.payload;
    let data = action.payload

    return updateObject(state, {
        error: null, loading: false, payload: data, status: "success",
    });
}

const createTaskStart = (state) => {
    return updateObject(state, {
        error: null, status: "loading",
    });
}

const createTaskSuccess = (state, action) => {
    let data = action.payload;

    let pending = [...state.payload.pending, data]
    let current_data = {...state.payload}
    current_data['pending'] = pending;

    return updateObject(state, {
        error: null, payload: current_data, status: "created",
    });
}

const deleteTaskSuccess = (state, action) => {
    let data = action.payload;

    let pending = state.payload.pending.filter(item => item.id !== data.id)
    let current_data = {...state.payload}
    current_data['pending'] = pending;

    return updateObject(state, {
        error: null, payload: current_data, status: "success",
    });
}

const updateTaskSuccess = (state, action) => {
    let data = action.payload;
    let current_data = {...state.payload}
    // remove from current
    let current_status = state.payload[data.status].filter(item => item.id !== data.task.id)
    let new_status = [data.task, ...state.payload[data.task.status]]

    current_data[data.status] = current_status;
    current_data[data.task.status] = new_status

    return updateObject(state, {
        error: null, payload: current_data, status: "success",
    });
}

const failAction = (state, action, status) => {
    console.log("action error", action.error)
    return updateObject(state, {
        error: action.error, loading: false, status: status,
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BOARD_READ_START:
            return boardReadStart(state, action);
        case BOARD_READ_SUCCESS:
            return boardReadSuccess(state, action);
        case BOARD_READ_FAIL:
            return failAction(state, action, "board_fail");
        case CREATE_TASK_FAIL:
            return failAction(state, action, "create_fail");
        case UPDATE_TASK_FAIL:
            return failAction(state, action, "update_fail");
        case DELETE_TASK_FAIL:
            return failAction(state, action, "delete_fail");
        case CREATE_TASK_START:
        case DELETE_TASK_START:
        case UPDATE_TASK_START:
            return createTaskStart(state)
        case CREATE_TASK_SUCCESS:
            return createTaskSuccess(state, action);
        case DELETE_TASK_SUCCESS:
            return deleteTaskSuccess(state, action);
        case UPDATE_TASK_SUCCESS:
            return updateTaskSuccess(state, action);
        default:
            return state;
    }
}

export default reducer;