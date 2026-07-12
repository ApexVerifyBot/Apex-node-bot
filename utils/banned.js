const db = require("./database");

const FILE = "banned_users.json";

async function isBanned(id) {

    const list = await db.read(FILE, []);

    return list.includes(String(id));
}

async function ban(id) {

    const list = await db.read(FILE, []);

    if (!list.includes(String(id))) {

        list.push(String(id));

        await db.write(FILE, list);
    }
}

async function unban(id) {

    let list = await db.read(FILE, []);

    list = list.filter(x => x !== String(id));

    await db.write(FILE, list);
}

module.exports = {
    isBanned,
    ban,
    unban
};
