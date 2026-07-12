function normalizeNumber(number) {

    return String(number).replace(/\D/g, "");
}

function formatBalance(balance) {

    return Number(balance).toFixed(2);
}

function maskNumber(number) {

    number = String(number);

    if (number.length < 7) return number;

    return number.slice(0, 4) + "****" + number.slice(-2);
}

module.exports = {

    normalizeNumber,

    formatBalance,

    maskNumber

};
