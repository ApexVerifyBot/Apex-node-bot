
require("dotenv").config();

module.exports = {

BOT_TOKEN: process.env.BOT_TOKEN,

API_KEY: process.env.API_KEY,

BASE_URL: process.env.BASE_URL,

OTP_GROUP_ID: Number(process.env.OTP_GROUP_ID),

ADMINS: process.env.ADMINS.split(",").map(Number),

OTP_RATE: 0.40,

REFERRAL_PRICE: 0.05,

MIN_WITHDRAW: 50,

MAX_WITHDRAW: 10000,

WELCOME_MESSAGE:
`⚡ APEX VERIFY BOT ⚡

Premium Fast Service`

};
