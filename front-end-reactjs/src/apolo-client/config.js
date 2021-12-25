export const ENVIRONMENT = 'dev'
//export const ENVIRONMENT = "production";
const HOST = '192.168.98.74'
const PORT = '3001'

const apiEnv = {
  dev: `http://${HOST}:${PORT}/admin/api`,
}

export const API_CMS = apiEnv[ENVIRONMENT]
