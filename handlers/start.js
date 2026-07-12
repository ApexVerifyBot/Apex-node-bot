const config = require("../config");
const users = require("../utils/users");
const banned = require("../utils/banned");
const bot = require("../bot");

module.exports = () => {

bot.onText(/\/start(?: (.+))?/, async (msg, match) => {

const chatId = msg.chat.id;
const userId = msg.from.id;

if (await banned.isBanned(userId)) {

return bot.sendMessage(chatId, "🚫 YOU ARE BANNED");
}

const user = await users.getUser(userId);

user.full_name = msg.from.first_name || "";
user.username = msg.from.username || "";

const db = require("../utils/database");

const data = await db.read("users.json", {});
data[userId] = user;
await db.write("users.json", data);

if (match && match[1]) {

const refId = match[1];

if (refId !== String(userId)) {

const referral = await db.read("referral_data.json", {});

if (!referral[userId]) {

referral[userId] = {

joined_by: refId

};

if (!referral[refId])

referral[refId] = {

referral_count: 0

};

referral[refId].referral_count++;

await db.write("referral_data.json", referral);

}
}

}

bot.sendMessage(chatId, config.WELCOME_MESSAGE, {

parse_mode: "HTML",

reply_markup: {

keyboard: [

[{ text: "📞 GET NUMBER" }],

[

{ text: "👥 REFER AND EARN" },

{ text: "👤 PROFILE" }

],

[{ text: "🏆 LEADERBOARD" }],

[{ text: "💬 SUPPORT" }]

],

resize_keyboard: true

}

});

});

};
