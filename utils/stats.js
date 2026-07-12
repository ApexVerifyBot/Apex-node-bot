const db = require("./database");

const FILE = "user_stats.json";

async function addOTP(id) {

    const stats = await db.read(FILE, {});

    if (!stats[id]) {

        stats[id] = {

            numbers_taken: [],

            otps_received: []

        };

    }

    stats[id].otps_received.push(Date.now());

    await db.write(FILE, stats);
}

async function addNumber(id) {

    const stats = await db.read(FILE, {});

    if (!stats[id]) {

        stats[id] = {

            numbers_taken: [],

            otps_received: []

        };

    }

    stats[id].numbers_taken.push(Date.now());

    await db.write(FILE, stats);
}

module.exports = {

    addOTP,

    addNumber

};
