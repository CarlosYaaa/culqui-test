import { generateRandomToken } from "../../src/common/generate-token";

describe('generateRandomToken', () => {
  it('debería generar una cadena de la longitud especificada', () => {
    const length = 10;
    const token = generateRandomToken(length);
    expect(token.length).toBe(length);
  });

  it('debería generar una cadena que solo contenga caracteres válidos', () => {
    const length = 20;
    const token = generateRandomToken(length);
    const validCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (const char of token) {
      expect(validCharacters.includes(char)).toBe(true);
    }
  });

  it('debería generar una cadena única en llamadas sucesivas', () => {
    const length = 16;
    const token1 = generateRandomToken(length);
    const token2 = generateRandomToken(length);

    expect(token1).not.toBe(token2);
  });
});
