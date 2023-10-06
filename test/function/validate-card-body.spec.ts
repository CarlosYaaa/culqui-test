import { ValidatorUtil } from '../../src/utils/validator.util';
import { ValidationError } from 'joi';

describe('validateBody', () => {
  it('debería validar correctamente una tarjeta válida', async () => {
    const validCard = {
      email: 'usuario@gmail.com',
      card_number: '4111111111111111',
      cvv: 123,
      expiration_year: '2023',
      expiration_month: '01',
    };

    const result = await ValidatorUtil.validateBody(validCard);

    expect(result).toBeDefined();
  });

  it('debería devolver error por correo invalido', async () => {
    const invalidCard = {
      email: 'usuario@gmail.xyz', //Correo invalido
      card_number: '4111111111111111',
      cvv: 123,
      expiration_year: '2024',
      expiration_month: '12',
    };

    try {
      await ValidatorUtil.validateBody(invalidCard);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
    }
  });
  it('debería devolver errores para número de tarjeta invalido', async () => {
    const invalidCard = {
      email: 'usuario@gmail.com',
      card_number: '4111111111111126', // Tarjeta invalida
      cvv: 123,
      expiration_year: '2024',
      expiration_month: '12',
    };

    try {
      await ValidatorUtil.validateBody(invalidCard);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
    }
  });
  it('debería devolver errores para cvv invalido', async () => {
    const invalidCard = {
      email: 'usuario@gmail.com',
      card_number: '4111111111111111',
      cvv: 2861,  // CVV invalido
      expiration_year: '2024',
      expiration_month: '12',
    };

    try {
      await ValidatorUtil.validateBody(invalidCard);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
    }
  });
  it('debería devolver errores año de expiracion invalido', async () => {
    const invalidCard = {
      email: 'usuario@gmail.com',
      card_number: '4111111111111111',
      cvv: 123,
      expiration_year: '2029', // Año de vencimiento inválido
      expiration_month: '12',
    };

    try {
      await ValidatorUtil.validateBody(invalidCard);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
    }
  });
  it('debería devolver errores para un mes de expiracion invalido', async () => {
    const invalidCard = {
      email: 'usuario@gmail.com',
      card_number: '4111111111111111',
      cvv: 123,
      expiration_year: '2025',
      expiration_month: '15', // Mes de vencimiento inválido
    };

    try {
      await ValidatorUtil.validateBody(invalidCard);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
    }
  });
});
