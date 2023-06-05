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
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const updateCounter = () => __awaiter(void 0, void 0, void 0, function* () {
    const readFile = util_1.default.promisify(fs_1.default.readFile);
    try {
        const jsonString = yield readFile("./src/utils/temp.json", "utf-8");
        const writeFile = util_1.default.promisify(fs_1.default.writeFile);
        try {
            const json = JSON.parse(jsonString);
            json.counter += 1;
            yield writeFile("./src/utils/temp.json", JSON.stringify(json));
            console.log("Completed overwrite the file, \nnew counter:", json.counter.toString(), "\nDate:", new Date());
        }
        catch (error) {
            console.error("Error writing file:", error);
        }
    }
    catch (error) {
        console.error("Error reading file:", error);
        return;
    }
});
exports.default = updateCounter;
