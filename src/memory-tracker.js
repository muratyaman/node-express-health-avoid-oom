class MemoryTracker {
  constructor({ maxMemoryUsageLimit }) {
    this.maxMemoryUsageLimit = maxMemoryUsageLimit;
  }

  memoryUsage() {
    // @see https://nodejs.org/api/process.html#processmemoryusage
    const mem = process.memoryUsage();
    console.log('MemoryTracker', mem);
    return mem.heapUsed;
  }

  isBusy() {
    return this.memoryUsage() > this.maxMemoryUsageLimit;
  }
}

module.exports = { MemoryTracker };
