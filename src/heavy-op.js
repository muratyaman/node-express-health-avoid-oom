const { int, randomInt, waitMs, makeRandomObject } = require('./utils');

function makeHeavyOp({
  dataLengthMin,
  dataLengthMax,
  waitLimitMin,
  waitLimitMax,
}) {

  // This function is a heavy operation that takes a long time to complete.
  async function heavyOp(req, res) {
    // get optional path params from the request
    let { length = '0', duration = '0' } = req.params || {};

    // decide on the length of array
    length = int(length, 0, 0) || randomInt(dataLengthMin, dataLengthMax);
    const data = Array.from({ length }); // allocate memory once

    // modify items in the array
    data.forEach((_val, idx) => {
      data[idx] = makeRandomObject();
    });

    // cause increased memory usage first
    const jsonOutput = JSON.stringify({ data, size: data.length });

    // free up memory; most developers forget this. But we want to cause more memory usage.
    // data.length = 0;

    duration = int(duration, 0, 0) || randomInt(waitLimitMin, waitLimitMax);
    await waitMs(duration);

    // JSON.stringify() and sending it will cost more memory!
    // return res.json({ data, size: data.length });

    res.set('Content-Type', 'application/json').send(jsonOutput);
  }

  return heavyOp;
}

module.exports = { makeHeavyOp };
