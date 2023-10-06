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
const validator_util_1 = require("../../src/utils/validator.util");
const joi_1 = require("joi");
describe('validateBody', () => {
    it('debería validar correctamente una tarjeta válida', () => __awaiter(void 0, void 0, void 0, function* () {
        const validCard = {
            email: 'usuario@gmail.com',
            card_number: '4111111111111111',
            cvv: 123,
            expiration_year: '2023',
            expiration_month: '01',
        };
        const result = yield validator_util_1.ValidatorUtil.validateBody(validCard);
        expect(result).toBeDefined();
    }));
    it('debería devolver error por correo invalido', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidCard = {
            email: 'usuario@gmail.xyz',
            card_number: '4111111111111111',
            cvv: 123,
            expiration_year: '2024',
            expiration_month: '12',
        };
        try {
            yield validator_util_1.ValidatorUtil.validateBody(invalidCard);
        }
        catch (error) {
            expect(error).toBeInstanceOf(joi_1.ValidationError);
        }
    }));
    it('debería devolver errores para número de tarjeta invalido', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidCard = {
            email: 'usuario@gmail.com',
            card_number: '4111111111111126',
            cvv: 123,
            expiration_year: '2024',
            expiration_month: '12',
        };
        try {
            yield validator_util_1.ValidatorUtil.validateBody(invalidCard);
        }
        catch (error) {
            expect(error).toBeInstanceOf(joi_1.ValidationError);
        }
    }));
    it('debería devolver errores para cvv invalido', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidCard = {
            email: 'usuario@gmail.com',
            card_number: '4111111111111111',
            cvv: 2861,
            expiration_year: '2024',
            expiration_month: '12',
        };
        try {
            yield validator_util_1.ValidatorUtil.validateBody(invalidCard);
        }
        catch (error) {
            expect(error).toBeInstanceOf(joi_1.ValidationError);
        }
    }));
    it('debería devolver errores año de expiracion invalido', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidCard = {
            email: 'usuario@gmail.com',
            card_number: '4111111111111111',
            cvv: 123,
            expiration_year: '2029',
            expiration_month: '12',
        };
        try {
            yield validator_util_1.ValidatorUtil.validateBody(invalidCard);
        }
        catch (error) {
            expect(error).toBeInstanceOf(joi_1.ValidationError);
        }
    }));
    it('debería devolver errores para un mes de expiracion invalido', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidCard = {
            email: 'usuario@gmail.com',
            card_number: '4111111111111111',
            cvv: 123,
            expiration_year: '2025',
            expiration_month: '15', // Mes de vencimiento inválido
        };
        try {
            yield validator_util_1.ValidatorUtil.validateBody(invalidCard);
        }
        catch (error) {
            expect(error).toBeInstanceOf(joi_1.ValidationError);
        }
    }));
});
