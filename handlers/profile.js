const bot = require("../bot");
const users = require("../utils/users");
const banned = require("../utils/banned");

module.exports = () => {

bot.on("message", async msg => {

if (msg.text !== "👤 PROFILE") return;

if (await banned.isBanned(msg.from.id))
return;

const user = await users.getUser(msg.from.id);

bot.sendMessage(

msg.chat.id,

`👤 PROFILE

🆔 ${msg.from.id}

💰 Balance : ${Number(user.balance).toFixed(2)} BDT

📱 Numbers : ${user.total_numbers || 0}

👥 Referrals : ${user.referral_count || 0}`

);

});

};
