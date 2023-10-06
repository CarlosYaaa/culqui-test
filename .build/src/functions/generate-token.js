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
exports.saveTokenInRedis = exports.storedCreditCardData = void 0;
const redis_client_1 = require("../../lib/redis-client");
const validator_util_1 = require("../utils/validator.util");
const error_util_1 = require("../utils/error.util");
const response_1 = require("../common/response");
const generate_token_1 = require("../common/generate-token");
const storedCreditCardData = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = JSON.parse(event.body);
        const token = (0, generate_token_1.generateRandomToken)(16);
        yield validator_util_1.ValidatorUtil.validateBody(body);
        yield saveTokenInRedis(token, body);
        return response_1.Response._201({ message: 'Datos de tarjeta almacenados correctamente', token });
    }
    catch (error) {
        return error_util_1.ErrorUtil.handleError(error);
    }
});
exports.storedCreditCardData = storedCreditCardData;
function saveTokenInRedis(token, body) {
    return __awaiter(this, void 0, void 0, function* () {
        yield redis_client_1.redisClient.connect();
        redis_client_1.redisClient.hSet(token, {
            email: (body.email).toLocaleLowerCase(),
            card_number: body.card_number,
            cvv: body.cvv,
            expiration_year: body.expiration_year,
            expiration_month: body.expiration_month
        });
        redis_client_1.redisClient.expire(token, 60);
        redis_client_1.redisClient.quit();
    });
}
exports.saveTokenInRedis = saveTokenInRedis;
