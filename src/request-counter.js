class RequestCounter {
  constructor({ concurrentRequestlimit }) {
    this.count = 0;
    this.concurrentRequestlimit = concurrentRequestlimit;
  }

  makeMiddleware() {
    const _this = this;

    function mw(_req, res, next) {
      _this.inc();
      // after sending the response, decrement the counter
      res.on('finish', () => {
        _this.dec();
      });
      next();
    }

    return mw;
  }

  inc() {
    this.count++;
  }

  dec() {
    this.count--;
  }

  concurrentRequests() {
    console.log('RequestCounter', this.count);
    return this.count;
  }

  isBusy() {
    return this.concurrentRequests() > this.concurrentRequestlimit;
  }
}

module.exports = { RequestCounter };
