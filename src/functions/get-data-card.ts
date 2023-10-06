import { APIGatewayProxyResult, APIGatewayProxyEvent } from 'aws-lambda';
import { ttlError } from '../common/ttl-error';
import { redisClient } from '../../lib/redis-client';
import { ErrorUtil } from '../utils/error.util';
import { Response } from '../common/response';
import { isEmptyObject } from '../common/object-empty';

export const getCreditCardData = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const evento = event.headers.authorization as string;
        const token = evento.startsWith('Bearer ') ? evento.slice(7) : evento;

        if (!token) return Response._400({ message: 'El token es requerido' })

        const response = await getDataCardFromRedis(token);
        return Response._200(response)

    } catch (error) {
        return ErrorUtil.handleError(error);
    }
};

export async function getDataCardFromRedis(token: string) {
    await redisClient.connect();

        const dataCard = await redisClient.hGetAll(token);

        if (isEmptyObject(dataCard)) {
            let errorNumberValueTtl = await redisClient.ttl(token);

            return ttlError(errorNumberValueTtl, redisClient);
        }
        redisClient.quit();

        const dataCardResponse = {
            email: dataCard.email,
            card_number: dataCard.card_number,
            expiration_year: dataCard.expiration_year,
            expiration_month: dataCard.expiration_month,
        }
        return dataCardResponse;
}
