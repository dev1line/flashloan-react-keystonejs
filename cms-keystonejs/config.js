const PROJECT_NAME = "Flashloans_CMS";
const COOKIE_SECRET =
  "f7745f4df4394027716de160fb2acd6aac36699576a8be586b75ac09acf6a0df"; //P@ssw0rd1
const HOST = "localhost";
const HOST_DB = "database";
const PORT_DB = "27017";
const ROOT_USERNAME = "root";
const ROOT_PASSWORD = "Password1";

const DB_CONNECTION = `mongodb://${ROOT_USERNAME}:${ROOT_PASSWORD}@${HOST}:${PORT_DB}/admin`;
const DB_CONNECTION_ON_DOCKER = `mongodb://${ROOT_USERNAME}:${ROOT_PASSWORD}@${HOST_DB}:${PORT_DB}/admin`;
const DB_CONNECTION_ON_CLOUD = `mongodb+srv://${ROOT_USERNAME}:${ROOT_PASSWORD}@cluster0.esdgu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// uri connection      mongodb://root:Password1@localhost:27017/admin
// uri cloud           mongodb+srv://root:Password1@cluster0.vsfsl.gcp.mongodb.net/napasolutiondata?retryWrites=true&w=majority

// email service
const MAIL_USERNAME = "napaglobalwebsite@gmail.com";
const MAIL_PASSWORD = "napa@123";
const MAIL_OAUTH_CLIENTID =
  "97425185563-fvie07qrr1p881apmfir38hk4jlubpcj.apps.googleusercontent.com";
const MAIL_OAUTH_CLIENT_SECRET = "-dKLdJNLip5Xmb8-gFqMpa3n";
const MAIL_ACCESS_TOKEN =
  "ya29.a0ARrdaM_vRGPqiJDhLjiO6lihpDQp1fGUZeb67paagTzIm-Lq5pSfD5NcLf7l2OX74-yF0Tg8I8bqqWLjnYQ1Kl6pTHLPTu6dJP0hJvvPtyYWzqbDBuBZZfdQPCZ0x5FsLi5eirPkGo7hC_z2oMX3miiJy1Gq";
const MAIL_OAUTH_REFRESH_TOKEN =
  "1//04LPbsakf6LZMCgYIARAAGAQSNwF-L9IroVNxfLD1-IrPLPhCnolJyjal_iJ2gs6mFav8zwl7YSQUo5ZpuLgUE4vGyBbro6v3gVk";

const MAIL_SERVER_CONFIG = {
  //Gmail service
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // type: "OAuth2",
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
    // clientId: MAIL_OAUTH_CLIENTID,
    // clientSecret: MAIL_OAUTH_CLIENT_SECRET,
    // refreshToken: MAIL_OAUTH_REFRESH_TOKEN,
    // accessToken: MAIL_ACCESS_TOKEN,
    // expires: 1884314697598,
  },
};

module.exports = {
  PROJECT_NAME,
  COOKIE_SECRET,
  DB_CONNECTION,
  DB_CONNECTION_ON_DOCKER,
  DB_CONNECTION_ON_CLOUD,
  MAIL_SERVER_CONFIG,
};
