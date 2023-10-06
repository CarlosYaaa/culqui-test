export const ttlError = (error: number, redisClient: any) => {
    const errorString = error.toString();
    const OPTIONS_TTL_ERROR: Record<string, string> = {
        "-2": 'El token ha expirado o no existe',
        "-1": 'La clave no esta asociada a un tiempo de expiracion',
    };
    const INTERNAL_ERROR = "Error interno en el servidor de redis"
    let response = OPTIONS_TTL_ERROR[errorString] || INTERNAL_ERROR;

    redisClient.quit();
    return {
        statusCode: 403,
        body: JSON.stringify(
            {
                message: response
            }
        )
    }
}
