interface Headers {
    [key: string]: boolean | number | string;
}

const headers: Headers = {
    "Content-type": "application/json",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Origin": "*"
};

export const Response = {
    DefineResponse(statusCode = 502, data = {}) {
        return {
            headers,
            statusCode,
            body: JSON.stringify(data)
        };
    },

    _200(data = {}) {
        return this.DefineResponse(200, data);
    },

    _201(data = {}) {
        return this.DefineResponse(201, data);
    },

    _400(data = {}) {
        return this.DefineResponse(400, data);
    },

    _401(data = {}) {
        return this.DefineResponse(401, data);
    },
}