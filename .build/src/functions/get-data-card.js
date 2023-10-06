"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataCardFromRedis = exports.getCreditCardData = void 0;
const ttl_error_1 = require("../common/ttl-error");
const redis_client_1 = require("../../lib/redis-client");
const error_util_1 = require("../utils/error.util");
const response_1 = require("../common/response");
const object_empty_1 = require("../common/object-empty");
const getCreditCardData = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const evento = event.headers.authorization;
        const token = evento.startsWith('Bearer ') ? evento.slice(7) : evento;
        if (!token)
            return response_1.Response._400({ message: 'El token es requerido' });
        const response = yield getDataCardFromRedis(token);
        return response_1.Response._200(response);
    }
    catch (error) {
        return error_util_1.ErrorUtil.handleError(error);
    }
});
exports.getCreditCardData = getCreditCardData;
function getDataCardFromRedis(token) {
    return __awaiter(this, void 0, void 0, function* () {
        yield redis_client_1.redisClient.connect();
        const dataCard = yield redis_client_1.redisClient.hGetAll(token);
        if ((0, object_empty_1.isEmptyObject)(dataCard)) {
            let errorNumberValueTtl = yield redis_client_1.redisClient.ttl(token);
            return (0, ttl_error_1.ttlError)(errorNumberValueTtl, redis_client_1.redisClient);
        }
        redis_client_1.redisClient.quit();
        const dataCardResponse = {
            email: dataCard.email,
            card_number: dataCard.card_number,
            expiration_year: dataCard.expiration_year,
            expiration_month: dataCard.expiration_month,
        };
        return dataCardResponse;
    });
}
exports.getDataCardFromRedis = getDataCardFromRedis;
