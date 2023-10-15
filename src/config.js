const { objGetInt } = require('./utils');

function makeConfig(penv = process.env) {

  // 80% => memory usage could be more volatile
  const memoryThresholdPctg = 1; // 0.80;

  const requestThresholdPctg = 1; // 0.90;

  const config = {
    httpPort              : objGetInt(penv, 'HTTP_PORT', '8080'),
    memoryUsageLimit      : Math.round(memoryThresholdPctg * 1024 * 1024 * objGetInt(penv, 'MEMORY_LIMIT_IN_MB', '128')),
    concurrentRequestlimit: Math.round(requestThresholdPctg * objGetInt(penv, 'CONCURRENT_REQUEST_LIMIT', '100')),

    // randomly generate 50-100k objects
    dataLengthMin: 50 * 1000,
    dataLengthMax: 100 * 1000,

    // randomly wait for 15-25 seconds
    waitLimitMin: 15 * 1000,
    waitLimitMax: 25 * 1000,
  };
  console.log({ config });
  return config;
}

module.exports = { makeConfig };
