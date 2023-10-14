class RequestRejector {
  constructor({ requestCounter, memoryTracker }) {
    this.requestCounter = requestCounter;
    this.memoryTracker = memoryTracker;
  }

  makeMiddleware() {
    const _this = this;
    function mw(_req, res, next) {
      if (_this.isBusy()) {
        res.status(500).json({ message: 'I am busy, call others' });
      } else {
        next();
      }
    }
    return mw;
  }

  isBusy() {
    const busy = this.requestCounter.isBusy() || this.memoryTracker.isBusy();
    console.log('RequestRejector', busy);
    return busy;
  }
}

module.exports = { RequestRejector };
