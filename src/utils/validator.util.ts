import * as joi from 'joi';
import { Card } from '../common/interfaces/card.interface';

export namespace ValidatorUtil {
    export async function validateBody(body: Card) {
        const schemaCardData = joi.object({
            email: joi.string().min(5).max(100).pattern(new RegExp(/^[a-zA-Z0-9._%+-]+@((yahoo|gmail)\.(com|es))$/)).required(),
            card_number: joi.string().min(13).max(16).pattern(/^[1-9][0-9]*$/, 'numbers').creditCard().required(),
            cvv: joi.number().min(100).max(9999).required(),
            expiration_year: joi.string().length(4).custom(expirationYear).required(),
            expiration_month: joi.string().length(2).pattern(/^(0[1-9]|1[0,1,2])/, 'numbers').required(),
        });
        
        return schemaCardData.validateAsync(body, { abortEarly: false });
    }
}

export const expirationYear = (year: string, helpers: any): string => {
    let yearCard = parseInt(year);
    let maxValueOfYear = new Date().getFullYear() + 5;

    if (yearCard > maxValueOfYear) {
        return helpers.error('Año de expiración invalido');
    }
    return year;
};
