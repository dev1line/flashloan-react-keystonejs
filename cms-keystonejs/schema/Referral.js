const { Text, CalendarDay } = require("@keystonejs/fields");
const access = require("../access.control");

const Referral = {
  fields: {
    name: { type: Text },
    addressFrom: { type: Text },
    addressTo: { type: Text },
    referralCode: { type: Text },
    referralAt: { type: CalendarDay, dateFrom: "1999-09-01" },
  },
  access: {
    read: true,
    update: access.userIsAdmin,
    create: true,
    delete: access.userIsAdmin,
  },
};

module.exports = Referral;
