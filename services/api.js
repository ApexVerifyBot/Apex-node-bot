const axios = require("axios");
const config = require("../config");

const api = axios.create({
    baseURL: config.BASE_URL,
    timeout: 15000
});

async function getNumber(range) {

    const url =
`/getnumber?api_key=${config.API_KEY}&rid=${range}&range=${range}&target=${range}&national=1&remove_plus=1`;

    const res = await api.get(url);

    return res.data;
}

module.exports = {
    getNumber
};
