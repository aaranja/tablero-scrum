import axios from "axios";
import * as actionTypes from "../actionTypes";

export const actionStart = (action) => {
    return {
        type: action,
    }
}

export const actionSuccess = (action, payload) => {
    return {
        payload: payload, type: action,
    }
}

export const actionFail = (action, error) => {
    let current_error = {
        code: error.code,
        message: error.message,
        response: error.response.data
    }
    return {
        error: current_error, type: action,
    }
}


export const getTasks = () => {
    /*
    * Function to get all task from server
    * */
    return async (dispatch) => {
        dispatch(actionStart(actionTypes.BOARD_READ_START))
        axios.defaults.headers = {
            "Content-Type": "application/json",
        };
        await axios
            .get('http://127.0.0.1:8000/scrumboard/tasks')
            .then((response) => {
                dispatch(actionSuccess(actionTypes.BOARD_READ_SUCCESS, response.data))
            })
            .catch((error) => {
                dispatch(actionFail(actionTypes.BOARD_READ_FAIL, error))
            })
    }
};

export const createTask = (data) => {
    return async (dispatch) => {
        dispatch(actionStart(actionTypes.CREATE_TASK_START))
        axios.defaults.headers = {
            "Content-Type": "application/json",
        };
        await axios
            .post('http://127.0.0.1:8000/scrumboard/tasks', data)
            .then((response) => {
                dispatch(actionSuccess(actionTypes.CREATE_TASK_SUCCESS, response.data))
            })
            .catch((error) => {
                console.log("table actions", error)
                dispatch(actionFail(actionTypes.CREATE_TASK_FAIL, error))
            })
    }
}

export const deleteTask = (id) => {
    return async (dispatch) => {
        dispatch(actionStart(actionTypes.DELETE_TASK_START));
        axios.defaults.headers = {
            "Content-Type": "application/json",
        };
        await axios
            .delete(`http://127.0.0.1:8000/scrumboard/tasks/delete=${id}`)
            .then((response) => {
                dispatch(actionSuccess(actionTypes.DELETE_TASK_SUCCESS, {id: id}))
            })
            .catch((error) => {
                dispatch(actionFail(actionTypes.DELETE_TASK_FAIL, error))
            })
    }
}

export const updateTask = (id, status) => {
    /*
    * Function to set new status or update a description task
    * */

    return async (dispatch) => {
        dispatch(actionStart(actionTypes.UPDATE_TASK_START));
        axios.defaults.headers = {
            "Content-Type": "application/json",
        };
        await axios
            .patch('http://127.0.0.1:8000/scrumboard/tasks', {id: id, status: status})
            .then((response) => {
                console.log("update task", response);
                dispatch(actionSuccess(actionTypes.UPDATE_TASK_SUCCESS, response.data));
            })
            .catch((error) => {
                dispatch(actionFail(actionTypes.UPDATE_TASK_FAIL, error))
            })
    }

}
