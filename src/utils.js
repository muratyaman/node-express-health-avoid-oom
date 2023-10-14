function randomInt(min = 0, max = 100) {
  return min + Math.floor(Math.random() * (1 + max - min));
}

function randomStr() {
  return Math.random().toString(36).substring(2, 15);
}

function waitMs(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { randomInt, randomStr, waitMs };
