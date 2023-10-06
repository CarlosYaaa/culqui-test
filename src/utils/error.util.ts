import * as joi from 'joi';
import { Response } from '../common/response';

export class HttpError extends Error {
    constructor(public statusCode: number, body: Record<string, unknown> = {}) {
        super(JSON.stringify(body));
    }
}

export namespace ErrorUtil {
    export function handleError(e: unknown) {
        if (e instanceof joi.ValidationError) {
            return Response._400({error: e.message})
        }

        if (e instanceof SyntaxError) {
            return Response._400({ error: `Formato de cuerpo del request invalido! : "${e.message}"` })
        }

        if (e instanceof HttpError) {
            return Response.DefineResponse(e.statusCode, e.message)
        }

        throw e;
    }
}