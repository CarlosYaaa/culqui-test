"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttlError = void 0;
const ttlError = (error, redisClient) => {
    const errorString = error.toString();
    const OPTIONS_TTL_ERROR = {
        "-2": 'El token ha expirado o no existe',
        "-1": 'La clave no esta asociada a un tiempo de expiracion',
    };
    const INTERNAL_ERROR = "Error interno en el servidor de redis";
    let response = OPTIONS_TTL_ERROR[errorString] || INTERNAL_ERROR;
    redisClient.quit();
    return {
        statusCode: 403,
        body: JSON.stringify({
            message: response
        })
    };
};
exports.ttlError = ttlError;
