const bot = require("../bot");
const api = require("../services/api");
const db = require("../utils/database");

module.exports = () => {

bot.on("message", async msg => {

if (msg.text !== "📞 GET NUMBER")
return;

const services =
await db.read("custom_services.json", []);

if (!services.length) {

return bot.sendMessage(
msg.chat.id,
"❌ No service available."
);

}

const keyboard =
services.map((s, i) => ([{

text: s.sid,

callback_data: "service_" + i

}]));

bot.sendMessage(

msg.chat.id,

"Select Service",

{

reply_markup: {

inline_keyboard: keyboard

}

}

);

});

};
