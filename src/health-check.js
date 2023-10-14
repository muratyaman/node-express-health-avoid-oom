function makeHealthCheck({ requestCounter, memoryTracker }) {

  function healthCheck(_req, res) {
    const memoryUsed = memoryTracker.memoryUsage();
    const concurrentRequests = requestCounter.concurrentRequests();
    if (memoryTracker.isBusy() || requestCounter.isBusy()) {
      // inform health check system that I am busy so that it can stop sending traffic to me
      res.status(500).json({ message: 'I am busy, call others' });
    } else {
      res.status(200).json({ message: 'OK', data: { memoryUsed, concurrentRequests } });
    }
  }

  return healthCheck;
}

module.exports = { makeHealthCheck };
