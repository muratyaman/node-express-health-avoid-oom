function int(i = '0', ifNaN = 0, min = 0) {
  let n = Number.parseInt(i, 10);
  n = Number.isNaN(n) ? ifNaN : n;
  if (n < min) n = min;
  return n;
}

function objGetStr(env, key, defaultValue = '') {
  return String(env && key in env ? (env[key] || defaultValue) : defaultValue);
}

function objGetInt(env, key, defaultValue = '0') {
  const d = int(defaultValue);
  return int(objGetStr(env, key, String(d)));
}

function randomInt(min = 0, max = 100) {
  return min + Math.floor(Math.random() * (1 + max - min));
}

function randomStr() {
  return Math.random().toString(36).substring(2, 15);
}

function waitMs(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeRandomObject() {
  return {
    id  : randomInt(),
    date: new Date(),
    str : randomStr(),
  };
}

module.exports = {
  int,
  makeRandomObject,
  objGetStr,
  objGetInt,
  randomInt,
  randomStr,
  waitMs,
};
