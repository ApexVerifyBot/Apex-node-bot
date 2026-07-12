const axios = require("axios");
const config = require("../config");
const bot = require("../bot");

const db = require("../utils/database");
const users = require("../utils/users");
const stats = require("../utils/stats");

const activeNumbers = {};

module.exports.activeNumbers = activeNumbers;

module.exports.start = () => {

setInterval(async () => {

try {

const res = await axios.get(

`${config.BASE_URL}/success_otp?api_key=${config.API_KEY}`

);

const body = res.data;

let otps = [];

if (Array.isArray(body))

otps = body;

else if (body.otps)

otps = body.otps;

else if (body.data?.otps)

otps = body.data.otps;

const paid =
await db.read("paid_sms.json",{});

for (const item of otps) {

const number =
String(item.number || item.phone || "")
.replace(/\D/g,"");

const key =
item.otp_id ||
number + "_" + (item.message||"");

if (paid[key])
continue;

if (!activeNumbers[number])
continue;

paid[key] = true;

await db.write(
"paid_sms.json",
paid
);

const userId =
activeNumbers[number].uid;

await users.updateBalance(
userId,
config.OTP_RATE
);

await stats.addOTP(userId);

const otp =
item.otp ||
item.otp_code ||
"----";

const sms =
item.message ||
item.sms ||
"No SMS";

await bot.sendMessage(

userId,

`✅ OTP RECEIVED

📞 +${number}

🔑 ${otp}

📩

${sms}

💰 +${config.OTP_RATE} BDT`

);

await bot.sendMessage(

config.OTP_GROUP_ID,

`✅ OTP

📞 ${number}

🔑 ${otp}

📩

${sms}`

);

delete activeNumbers[number];

}

}

catch(e){

console.log(e.message);

}

},1000);

};
