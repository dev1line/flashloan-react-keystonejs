const { Text, Password, Checkbox } = require('@keystonejs/fields')
const access = require('../access.control')

const User = {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true
    },
    isAdmin: {
      type: Checkbox,
      // Field-level access controls
      // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
      access: {
        update: access.userIsAdmin
      }
    },
    password: {
      type: Password
    }
  },
  // List-level access controls
  access: {
    read: access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true
  }
}

module.exports = User
