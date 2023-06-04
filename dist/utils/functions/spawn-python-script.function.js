"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
var path = require("path");
function spawnPythonScript(pythonFilePath, args) {
    const pathToPythonEnvirontment = path.join(__dirname, "..", "python");
    let finalArgs = [path.join(pathToPythonEnvirontment, ...pythonFilePath)];
    if (args) {
        finalArgs = [...finalArgs, ...args];
    }
    const pythonScript = (0, child_process_1.spawn)(path.join(pathToPythonEnvirontment, "Scripts", "python"), finalArgs);
    return pythonScript;
}
exports.default = spawnPythonScript;
