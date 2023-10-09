import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda'
import { redisClient } from "../../lib/redis-client";
import { ValidatorUtil } from '../utils/validator.util';
import { ErrorUtil } from '../utils/error.util';
import { Response } from '../common/response';
import { Card } from '../common/interfaces/card.interface';
import { generateRandomToken } from '../common/generate-token';
export const storedCreditCardData = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const body = JSON.parse(event.body as string);
        const token = generateRandomToken(16);
        await ValidatorUtil.validateBody(body);
        await  saveTokenInRedis(token, body);
        return Response._201({ message: 'Datos de tarjeta almacenados correctamente', token })
    } catch (error) {
        return ErrorUtil.handleError(error)
    }
}

export async function saveTokenInRedis(token: string, body: Card): Promise<void> {
    await redisClient.connect()
    redisClient.hSet(token, {
        email: (body.email).toLocaleLowerCase(),
        card_number: body.card_number,
        cvv: body.cvv,
        expiration_year: body.expiration_year,
        expiration_month: body.expiration_month
    })
    redisClient.expire(token, 900)
    redisClient.quit();
}
