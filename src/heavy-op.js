const { randomInt, randomStr, waitMs } = require('./utils');

function makeHeavyOp() {

  async function heavyOp(_req, res) {
    const data = [];
    const limit = randomInt(50000, 100000);
    let i = 0;
    do {
      data.push({ date: new Date(), id: randomInt(), str: randomStr() });
    } while (i++ < limit);

    // randomly wait for 15-25 seconds
    await waitMs(randomInt(15000, 25000));

    return res.json({ data, size: data.length });
  }

  return heavyOp;
}

module.exports = { makeHeavyOp };
