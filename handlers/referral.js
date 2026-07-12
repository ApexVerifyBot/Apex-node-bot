const bot = require("../bot");
const db = require("../utils/database");

module.exports = () => {

bot.on("message", async msg => {

if (msg.text !== "👥 REFER AND EARN")
return;

const me = await bot.getMe();

const link =
`https://t.me/${me.username}?start=${msg.from.id}`;

const refs =
await db.read("referral_data.json", {});

const count =
refs[msg.from.id]?.referral_count || 0;

bot.sendMessage(

msg.chat.id,

`🎁 REFER & EARN

Your Link

${link}

Successful Referrals : ${count}`

);

});

};
