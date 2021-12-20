const { Keystone } = require("@keystonejs/keystone");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");

const {
  PROJECT_NAME,
  COOKIE_SECRET,
  DB_CONNECTION,
  DB_CONNECTION_ON_DOCKER,
  DB_CONNECTION_ON_CLOUD,
} = require("./config");

const UserSchema = require("./schema/User");
const PageSchema = require("./schema/Page");
const LayoutSchema = require("./schema/Layout");
const PropertySchema = require("./schema/Property");
const CustomerSchema = require("./schema/Customer");
const BannerSchema = require("./schema/Banner");
const ContactSchema = require("./schema/Contact");
const VideoSchema = require("./schema/Video");

const { initialAction } = require("./inital-data");

const mongoUri = process.env.DOCKER
  ? DB_CONNECTION_ON_DOCKER
  : process.env.NODE_ENV == "development"
  ? DB_CONNECTION_ON_CLOUD
  : DB_CONNECTION;

const adapterConfig = {
  mongoUri: mongoUri,
};

// console.log("Database URI:", mongoUri);

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  onConnect: process.env.INIT_DATA && initialAction,
  cookieSecret: COOKIE_SECRET,
  cookie: {
    secure: false,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  },
  queryLimits: {
    maxTotalResults: 1000, //limit of the total results of all relationship subqueries
  },
});

const listSchema = [
  { name: "User", schema: UserSchema },
  { name: "Page", schema: PageSchema },
  { name: "Layout", schema: LayoutSchema },
  { name: "Property", schema: PropertySchema },
  { name: "Contact", schema: ContactSchema },
  { name: "Banner", schema: BannerSchema },
  { name: "Customer", schema: CustomerSchema },
  { name: "Video", schema: VideoSchema },
];

listSchema.map(({ name, schema }) => keystone.createList(name, schema));

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User",
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
};
