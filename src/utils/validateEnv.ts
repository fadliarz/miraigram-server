import { cleanEnv, str, port } from "envalid";

function validateEnv(): void {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ["development", "production"],
    }),
    SMARTPROXY_USERNAME: str(),
    SMARTPROXY_PASSWORD: str(),
    MONGO_PATH: str(),
    MONGO_USERNAME: str(),
    MONGO_PASSWORD: str(),
    PORT: port({ default: 3000 }),
  });
}

export default validateEnv;
