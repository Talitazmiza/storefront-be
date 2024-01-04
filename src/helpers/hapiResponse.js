const { ClientError } = require("./../exceptions/ClientError")

function defaultResponse(statusCode, message, data) {
    let resp = {};

    resp["StatusCode"] = statusCode;
    if (statusCode === 200 || statusCode === 201) {
        resp ["Status"] = "success"
    } else if (statusCode == 500){
        resp["Status"] = "error"
    } else {
        resp["Status"] = "failed"
    }
    resp["Message"] = message;
    resp["Data"] = data

    return resp
}

function ResponseHandler(h, statusCode, message, data) {
    const resp = defaultResponse(statusCode, message, data)

    const hapiResponse = h.response(resp);
    hapiResponse.code(statusCode);

    return hapiResponse
}

function ResponseHandlerFromService(h, responseService) {
    const hapiResponse = h.response(responseService);
    hapiResponse.code(responseService.StatusCode);

    return hapiResponse
}

async function ResponseService(statusCode, message, data) {
   return defaultResponse(statusCode, message, data)
}

function CatchResponse(h, error, errorCustomMessage) {
    // if (error instanceof ClientError) {
        // return this.defaultResponse(h, err.statusCode, `${errorCustomMessage}, ${err.message}`)
    // }

    return defaultResponse(h, 500, "Sorry there's problem in our server.")
}

module.exports = {
    ResponseHandler,
    ResponseHandlerFromService,
    CatchResponse,
    ResponseService
}
