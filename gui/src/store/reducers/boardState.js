export const start = (method, data, newData) => {
    switch (method) {
        case "get":
            return {
                status: "loading", data: {}, action: "get",
            }
        case "post":
            return {
                status: "loading", data: data, action: "post"
            }
        default:
            return null;
    }
}

export const success = (method, data, newData) => {
    switch (method) {
        case "get":
            return {
                status: "success", data: newData, action: "get",
            }
        case "post":
            return {
                status: "loading", data: post_success(data, newData), action: "post"
            }
        default:
            return null;
    }
}

const post_success = (oldData, newData) => {

    let old_data = {...oldData}

    old_data[newData.status].push(newData)

    return {
        data: old_data, status: "success", action: "post",
    };
}