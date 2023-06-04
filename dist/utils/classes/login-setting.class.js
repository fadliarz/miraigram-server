"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class LoginSetting {
    constructor() {
        const rawDeviceSettingsList = (0, fs_1.readFileSync)("src/utils/devices.txt")
            .toString()
            .split("\n");
        const rawDeviceSettings = rawDeviceSettingsList[Math.floor(Math.random() * rawDeviceSettingsList.length)].split("|");
        const proxiesList = (0, fs_1.readFileSync)("src/utils/proxies.txt")
            .toString()
            .split("\n");
        this._userAgent = rawDeviceSettings[10].split(")")[0].concat(")");
        this._deviceSettings = {
            app_version: this._userAgent.split(" ")[1],
            android_version: Number(rawDeviceSettings[1]),
            android_release: rawDeviceSettings[2],
            dpi: rawDeviceSettings[3],
            resolution: rawDeviceSettings[4],
            manufacturer: rawDeviceSettings[5],
            device: rawDeviceSettings[6],
            model: rawDeviceSettings[7],
            cpu: rawDeviceSettings[8],
            version_code: rawDeviceSettings[9],
        };
        this._proxy = proxiesList[Math.floor(Math.random() * proxiesList.length)];
    }
    get deviceSettings() {
        return this._deviceSettings;
    }
    get userAgent() {
        return this._userAgent;
    }
    get proxy() {
        return this._proxy;
    }
}
exports.default = LoginSetting;
