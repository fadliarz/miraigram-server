import { readFileSync } from "fs";
import { DeviceSettings } from "@/utils/interfaces/login.interface";

class LoginSetting {
  private _userAgent: string;
  private _deviceSettings: DeviceSettings;
  private _proxy: string;

  constructor() {
    const rawDeviceSettingsList: string[] = readFileSync(
      "src/utils/txt/devices.txt"
    )
      .toString()
      .split("\n");

    const rawDeviceSettings =
      rawDeviceSettingsList[
        Math.floor(Math.random() * rawDeviceSettingsList.length)
      ].split("|");

    const proxiesList: string[] = readFileSync("src/utils/txt/proxies.txt")
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
    this._proxy = proxiesList[Math.floor(Math.random() * proxiesList.length)].split("\r")[0]
      .replace("{USERNAME}", process.env.SMARTPROXY_USERNAME as string)
      .replace("{PASSWORD}", process.env.SMARTPROXY_PASSWORD as string);
  }

  public get deviceSettings() {
    return this._deviceSettings;
  }

  public get userAgent() {
    return this._userAgent;
  }

  public get proxy() {
    return this._proxy;
  }
}

export default LoginSetting;
