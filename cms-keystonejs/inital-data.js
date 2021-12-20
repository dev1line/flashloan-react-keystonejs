const { createItems } = require("@keystonejs/server-side-graphql-client");

const UserInitialData = [
  {
    data: {
      name: "Admin",
      email: "admin@example.com",
      password: "admin@123",
      isAdmin: true,
    },
  },
];

const initialAction = async (keystone) => {
  await createItems({ keystone, listKey: "User", items: UserInitialData });
};

module.exports = { UserInitialData, initialAction };
