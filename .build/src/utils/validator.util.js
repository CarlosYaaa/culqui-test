"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.expirationYear = exports.ValidatorUtil = void 0;
const joi = __importStar(require("joi"));
var ValidatorUtil;
(function (ValidatorUtil) {
    function validateBody(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const schemaCardData = joi.object({
                email: joi.string().min(5).max(100).pattern(new RegExp(/^[a-zA-Z0-9._%+-]+@((yahoo|gmail)\.(com|es))$/)).required(),
                card_number: joi.string().min(13).max(16).pattern(/^[1-9][0-9]*$/, 'numbers').creditCard().required(),
                cvv: joi.number().min(100).max(9999).required(),
                expiration_year: joi.string().length(4).custom(exports.expirationYear).required(),
                expiration_month: joi.string().length(2).pattern(/^(0[1-9]|1[0,1,2])/, 'numbers').required(),
            });
            return schemaCardData.validateAsync(body, { abortEarly: false });
        });
    }
    ValidatorUtil.validateBody = validateBody;
})(ValidatorUtil || (exports.ValidatorUtil = ValidatorUtil = {}));
const expirationYear = (year, helpers) => {
    let yearCard = parseInt(year);
    let maxValueOfYear = new Date().getFullYear() + 5;
    if (yearCard > maxValueOfYear) {
        return helpers.error('Año de expiración invalido');
    }
    return year;
};
exports.expirationYear = expirationYear;
