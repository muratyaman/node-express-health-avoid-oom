function makeHealthCheck({ config, requestCounter, memoryTracker }) {
  
  function healthCheck(_req, res) {
    const { memoryUsageLimit, concurrentRequestlimit } = config;

    const memoryUsed         = memoryTracker.memoryUsage();
    const concurrentRequests = requestCounter.concurrentRequests();

    const data = { memoryUsed, memoryUsageLimit, concurrentRequests, concurrentRequestlimit };

    if (memoryTracker.isBusy() || requestCounter.isBusy()) {
      // inform health check system that I am busy so that it can stop sending traffic to me
      res.status(500).json({ message: 'I am busy, call others', ts: new Date(), data });
    } else {
      res.status(200).json({ message: 'OK', ts: new Date(), data });
    }
  }

  return healthCheck;
}

module.exports = { makeHealthCheck };
