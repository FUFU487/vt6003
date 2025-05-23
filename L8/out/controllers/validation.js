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
exports.validateArticle = void 0;
const jsonschema_1 = require("jsonschema");
const article_schema_1 = require("../schemas/article.schema");
const v = new jsonschema_1.Validator();
const validateArticle = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validationOptions = {
        throwError: true,
        allowUnknownAttributes: false,
    };
    const body = ctx.request.body;
    try {
        v.validate(body, article_schema_1.article, validationOptions);
        yield next();
    }
    catch (err) {
        if (err instanceof jsonschema_1.ValidationError) {
            ctx.body = err;
            ctx.status = 400;
        }
        else {
            throw err;
        }
    }
});
exports.validateArticle = validateArticle;
