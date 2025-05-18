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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_json_1 = __importDefault(require("koa-json"));
const articles_1 = require("./routes/articles");
const app = new koa_1.default();
//const router: Router = new Router();
/*const welcomeAPI = async (ctx: RouterContext, next:any) => {
  ctx.body = {message: "Welcome to the blog API!"};
  await next();
}

router.get('/api/v1', welcomeAPI);*/
// For Document:
app.use((0, koa_logger_1.default)());
app.use((0, koa_json_1.default)());
app.use(articles_1.router.middleware());
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield next();
        console.log(ctx.status);
        if (ctx.status === 404) {
            ctx.body = { err: "Resource not found" };
        }
    }
    catch (err) {
        ctx.body = { err: err };
    }
}));
app.listen(10888, () => {
    console.log("Koa Started");
});
