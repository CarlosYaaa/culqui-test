"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generate_token_1 = require("../../src/common/generate-token");
describe('generateRandomToken', () => {
    it('debería generar una cadena de la longitud especificada', () => {
        const length = 10;
        const token = (0, generate_token_1.generateRandomToken)(length);
        expect(token.length).toBe(length);
    });
    it('debería generar una cadena que solo contenga caracteres válidos', () => {
        const length = 20;
        const token = (0, generate_token_1.generateRandomToken)(length);
        const validCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (const char of token) {
            expect(validCharacters.includes(char)).toBe(true);
        }
    });
    it('debería generar una cadena única en llamadas sucesivas', () => {
        const length = 16;
        const token1 = (0, generate_token_1.generateRandomToken)(length);
        const token2 = (0, generate_token_1.generateRandomToken)(length);
        expect(token1).not.toBe(token2);
    });
});
