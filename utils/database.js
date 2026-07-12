const db = require("./database");

const FILE = "users.json";

async function getUser(id) {

    const users = await db.read(FILE, {});

    if (!users[id]) {

        users[id] = {
            user_id: id,
            balance: 0,
            total_numbers: 0,
            referral_count: 0
        };

        await db.write(FILE, users);
    }

    return users[id];
}

async function updateBalance(id, amount) {

    const users = await db.read(FILE, {});

    if (!users[id]) return 0;

    users[id].balance =
        Number(users[id].balance) + Number(amount);

    await db.write(FILE, users);

    return users[id].balance;
}

async function allUsers() {

    const users = await db.read(FILE, {});

    return Object.keys(users);
}

module.exports = {
    getUser,
    updateBalance,
    allUsers
};
