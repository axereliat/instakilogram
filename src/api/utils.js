export function parseAjaxError (err) {
    let message = '';
    if (err.responseJSON) {
        if (err.responseJSON.error) {
            message = err.responseJSON.error
        } else if (err.responseJSON.errors) {
            var key = Object.keys(err.responseJSON.errors)[0]
            message = err.responseJSON.errors[key][0]
        } else if (err.responseJSON.message) {
            message = err.responseJSON.message
        }
    } else {
        message = err.toString()
    }

    return message
}
