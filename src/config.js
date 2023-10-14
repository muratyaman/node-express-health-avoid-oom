function makeConfig(penv = process.env) {
  return {
    httpPort              : penv.HTTP_PORT || '8080',
    maxMemoryUsageLimit   : 0.9 * 1024 * 1024 * (penv.MEMORY_LIMIT_IN_MB || '64'), // 90% of limit
    concurrentRequestlimit: 0.9 * (penv.CONCURRENT_REQUEST_LIMIT || '100'), // 90% of limit
  };
}

module.exports = { makeConfig };
