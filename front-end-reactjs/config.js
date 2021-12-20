export const ENVIRONMENT = "dev";
//export const ENVIRONMENT = "production";
const HOST = process.env.NEXT_PUBLIC_API || "127.0.0.1";
const PORT = "3001";

const apiEnv = {
  dev: `http://${HOST}:${PORT}/admin/api`,
};

export const API_CMS = apiEnv[ENVIRONMENT];
