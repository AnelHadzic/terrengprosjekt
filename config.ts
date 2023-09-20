import dotenv from "dotenv";

dotenv.config();

interface ENV {
  DB_KEY: string | undefined;
}

interface Config {
  DB_KEY: string;
}

const getConfig = (): ENV => {
  return {
    DB_KEY: process.env.DB_KEY,
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
